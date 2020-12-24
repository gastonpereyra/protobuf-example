'use strict';

const lllog = require('lllog')();

const fs = require('fs')
const { promisify } = require('util');
const fsWriteFile = promisify(fs.writeFile);

const generate = async (entity = 'examples', size) => {

    lllog.info('Start Encoding file for', entity);

    try{

        const ProtobufLib = require(`./protobuf/${entity}`);

        const dataset = size ? require(`./generator/${entity}`)(Number(size)) : require(`./dataset/${entity}`);

        const protoBufLib = new ProtobufLib();

        console.time('Protobuf Perfomance');
        const dataEncoded = await protoBufLib.generateBuffer(dataset);
        console.timeEnd('Protobuf Perfomance');

        if(!dataEncoded)
            lllog.error('Could not Generate File, cannot verify data');

        else {
            await Promise.all([
                fsWriteFile(`encoded/${entity}Encoded.proto`, dataEncoded),
                size && fsWriteFile(`dataset/${entity}.json`, JSON.stringify(dataset))
            ]);
        }

    } catch(error) {
        lllog.error('Could not Generate File', error.message);
    }

    lllog.info('Finish Encoding file');
};

const [,,entity, size] = process.argv;

generate(entity, size);
