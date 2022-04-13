const process = require('process');

const { RaspiIO } = require('raspi-io');
const five = require('johnny-five');
const fetch = require('node-fetch');

const cloudId = process.env.CLOUD_ID;

console.log(`Cloud ID: ${cloudId}`);

const board = new five.Board({
    io: new RaspiIO(),
    repl: false,
});

const now = () => {
  return new Date().toISOString();
}

board.on('ready', () => {
  // const led = new five.Led('P1-7');
  const motionSensor = new five.Motion('P1-11');

  motionSensor.on('calibrated', () => {
    console.log('MotionSensor - calibrated', now());
  });

  motionSensor.on('motionstart', () => {
    console.log('MotionSensor - Motion Started', now());
    // led.on();
    
    fetch(`https://${cloudId}.connect.athom.com/api/manager/logic/webhook/Garage-Motion-Started`)
      .then((res) => {
        return res.text();
      }).then((body) => {
        console.log(`HTTP event successful, response: ${body}`);
      }).catch((e) => {
        console.log('HTTP event failed');
        console.error(e);
      });
  });

  motionSensor.on('motionend', () => {
    console.log('MotionSensor - Motion Ended', now());
    // led.off();

    fetch(`https://${cloudId}.connect.athom.com/api/manager/logic/webhook/Garage-Motion-Ended`)
      .then((res) => {
        return res.text();
      }).then((body) => {
        console.log(`HTTP event successful, response: ${body}`);
      }).catch((e) => {
        console.log('HTTP event failed');
        console.error(e);
      });
  });
});
