'use strict';

const lllog = require('lllog')();

const fs = require('fs')
const { promisify } = require('util');
const fsWriteFile = promisify(fs.writeFile);

const generate = async (entity = 'examples') => {

    lllog.info('Start Encoding file for', entity);

    try{

        const ProtobufLib = require(`./protobuf/${entity}`);
        const dataset = require(`./dataset/${entity}.json`);

        const protoBufLib = new ProtobufLib();
        const dataEncoded = await protoBufLib.generateBuffer(dataset);

        if(!dataEncoded)
            lllog.error('Could not Generate File, cannot verify data');
        else
            await fsWriteFile(`encoded/${entity}Encoded.proto`, dataEncoded);

    } catch(error) {
        lllog.error('Could not Generate File', error.message);
    }

    lllog.info('Finish Encoding file');
};

const [,,entity] = process.argv;

generate(entity);
