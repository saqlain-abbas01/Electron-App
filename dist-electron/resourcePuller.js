import os from "os";
import si from "systeminformation";
export async function getSystemInfo() {
    const cpu = await si.cpu();
    const mem = await si.mem();
    const disk = await si.fsSize();
    const currentLoad = await si.currentLoad();
    const osInfo = await si.osInfo();
    return {
        os: {
            platform: osInfo.platform,
            distro: osInfo.distro,
            release: osInfo.release,
            arch: os.arch(),
        },
        cpu: {
            manufacturer: cpu.manufacturer,
            brand: cpu.brand,
            speed: cpu.speed + " GHz",
            cores: cpu.cores,
            load: currentLoad.currentLoad.toFixed(2) + " %",
        },
        memory: {
            total: (mem.total / 1024 / 1024 / 1024).toFixed(2) + " GB",
            used: (mem.used / 1024 / 1024 / 1024).toFixed(2) + " GB",
            free: (mem.free / 1024 / 1024 / 1024).toFixed(2) + " GB",
        },
        storage: disk.map((d) => ({
            fs: d.fs,
            type: d.type,
            size: (d.size / 1024 / 1024 / 1024).toFixed(2) + " GB",
            used: (d.used / 1024 / 1024 / 1024).toFixed(2) + " GB",
            use: d.use.toFixed(2) + " %",
        })),
    };
}
// ✅ Exported function that starts the interval
export function getSystemInfoInterval(intervalMs = 5000) {
    setInterval(async () => {
        const info = await getSystemInfo();
        console.log("System Info:", info);
        // You could add a callback or IPC send here if needed
    }, intervalMs);
}
