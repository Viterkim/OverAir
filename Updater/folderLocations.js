//Local for mac development
const boot = '/Users/viter/Documents/OverAir/Updater/tmp/tmpBoot/';
const app1 = '/Users/viter/Documents/OverAir/Updater/tmp/tmpApp1/';
const app2 = '/Users/viter/Documents/OverAir/Updater/tmp/tmpApp2/';
const rootfs = '/Users/viter/Documents/OverAir/Updater/tmp/tmpRootfs/';
const tmp = '/Users/viter/Documents/OverAir/Updater/tmp/tmpTmp/';
const data = '/Users/viter/Documents/OverAir/Updater/tmp/tmpData/';

//Real locations
// const boot = '/boot/';
// const app1 = '/app1/';
// const app2 = '/app2/';
// const rootfs = '/';
// const tmp = '/tmp/';
// const data = '/data/';

// Block device locations
const device = '/Users/viter/Documents/OverAir/Updater/tmp/tmpDev/vda';
// const device = '/dev/mmcblk0p';
// const device = '/dev/vda';



module.exports = {
    boot,
    app1,
    app2,
    rootfs,
    tmp,
    data,
    device
}