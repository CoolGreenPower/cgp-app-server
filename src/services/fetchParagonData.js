const haloS = require('../../lib/haloS')

// start up the haloS environment
haloS.initialize();

// our private network key to use for all communication
const ourNetworkKey = haloS.createNetworkKey("example@example.com", "password");
var ourHaloCloudKey = haloS.createHaloCloudKey("smunikoti@coolgreenpower.com", "H@wking121");


// const sensor = "/company/paragonrobotics.com/device/transform/22212/1/122/machine/3"
// const sensor = "/company/paragonrobotics.com/device/transform/20102/1/649/machine/3"

haloS.connectToHaloCloud("tcp", "paragonrobotics.com", ourHaloCloudKey,
    ourNetworkKey, function (isConnected) {
        if (isConnected) {
            console.log("Connection successful!")
            const sensor = "/company/paragonrobotics.com/device/transform/20102/1/315/machine/3"
            haloS.readValue(sensor, (r) => {
                console.log("response", r)
            })

            // set start time to begin reading data from
            var startTime = new Date("JUL 23 2021");
            // end time is now
            var endTime = new Date();
            
            haloS.readRecordedData(sensor, startTime, endTime, function (dataObject) {
                console.log("Data:" + JSON.stringify(dataObject));
            });
        }
    })