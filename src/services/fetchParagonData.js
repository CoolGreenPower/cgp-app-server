const haloS = require('../../lib/haloS')

// start up the haloS environment
haloS.initialize();

// our private network key to use for all communication
const ourNetworkKey = haloS.createNetworkKey("jmueller@coolgreenpower.com", "329Silver1$");
var ourHaloCloudKey = haloS.createHaloCloudKey("jmueller@coolgreenpower.com", "329Silver1$");
const gatewayDevice = "/company/paragonrobotics.com/device/sensor/N22-21-2 controller v1 #122";

haloS.configureGatewayHaloCloud(gatewayDevice, ourNetworkKey,
    "paragonrobotics.com",
    "/company/paragonrobotics.com/sales",
    ourHaloCloudKey, function(r,e){
if (!r){
    console.log("An error occurred while configuring"+
        " HaloCloud");
}
else {
    console.log("The gateway is now fully configured!");
}
haloS.shutdown();
});