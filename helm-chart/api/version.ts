const version = (req: $TSFixMe, res: $TSFixMe) => {
    res.send({ helmChartVersion: process.env.npm_package_version });
};

export default version;
