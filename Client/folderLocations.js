//Local mac locations for development
const boot = '/Users/viter/Documents/OverAir/Client/tmp/tmpBoot/';
const app1 = '/Users/viter/Documents/OverAir/Client/tmp/tmpApp1/';
const app2 = '/Users/viter/Documents/OverAir/Client/tmp/tmpApp2/';
const rootfs = '/Users/viter/Documents/OverAir/Client/tmp/tmpRootfs/';
const tmp = '/Users/viter/Documents/OverAir/Client/tmp/tmpTmp/';
const data = '/Users/viter/Documents/OverAir/Client/tmp/tmpData/';
//Real locations
// const kernelDownloadLocation = '/boot/';
// const app1 = '/app1';
// const app2 = '/app2';
// const rootfs = '/';
// const tmp = '/tmp';
// const data = '/data';

// Real block devices
// const device = '/dev/mmcblk0p';
// Qemu block devices
// const device = '/dev/vda';
// Faking block device for local development
const device = '/Users/viter/Documents/OverAir/Client/tmp/tmpDev/vda'

module.exports = {
    boot,
    app1,
    app2,
    rootfs,
    tmp,
    data,
    device
}