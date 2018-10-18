const Jimp = require("jimp");
/**
 * 处理图片 生成两个buffer，一个压缩后的原图，一个后的缩略图
 * @param fileName
 * @param mimeType
 * @returns {Function}
 */
const handleImage = (fileName, mimeType) => res => callback => fileBuffer => {
    const promiseJimp = new Promise((resolve, reject) => {
        //将原图压缩
        Jimp.read(fileBuffer, function (err, data) {
            if (err) return reject(err)
            const length = fileBuffer.length
            let quality
            if (length < 2000000) {
                //小于2mb
                quality = 80;
            } else if (length < 4000000) {
                //小于2mb
                quality = 30;
            } else if (length < 60000000) {
                quality = 20;
            } else if (length < 8000000) {
                quality = 12;
            } else {
                quality = 10;
            }
            data.scale(0.5);
            data.quality(quality)
            console.log(`mimeType：${mimeType}`)
            console.log(`quality: ${quality}`)
            if (mimeType === 'image/png') {
                data.rgba(true);             // set whether PNGs are saved as RGBA (true, default) or RGB (false)
                data.filterType(-1);     // set the filter type for the saved PNG （-1-4）
                data.deflateLevel(9);   // set the deflate level for the saved PNG (0-9)
                data.deflateStrategy(0); // set the deflate for the saved PNG (0-3)
                data.scale(0.5)
            }
            //data.exifRotate()
            data.getBuffer(Jimp.AUTO, (err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
        })
    })
    //压缩后的原图再生成缩略图
    promiseJimp.then((buffer) => {
        Jimp.read(buffer, function (err, data) {
            if (err) return res.json(err)
            const newPromise = new Promise((resolve, reject) => {
                data.resize(Jimp.AUTO, 150, Jimp.RESIZE_BICUBIC)
                //data.exifRotate()
                data.quality(50)
                data.getBuffer(Jimp.AUTO, function (nothing, image) {
                    resolve(image)
                });
            })
            return newPromise.then(data => {
                callback && callback({
                    compressData: data,
                    sourceBuffer: buffer,
                    compressFile: {   //压缩后，并且声称的缩略图 File类型文件
                        value: data,
                        options: {
                            filename: fileName,
                            contentType: mimeType
                        }
                    },
                    sourceFile: {   //压缩后，未声称缩略图的File类型文件
                        value: buffer,
                        options: {
                            filename: fileName,
                            contentType: mimeType
                        }
                    }
                });

            })
        })
    })
        .catch(err => {
            console.log(err);
        })
}
module.exports.handleImage = handleImage;

/**
 * ES5生命方法，避免ES6剪头函数的可读性太差引起疑问。其实可以直接写一个function(fileName, mimeType, res, callback) { return function (fileBuffer){} }
 * @param {*} fileName 
 * @param {*} mimeType 
 */
const es5HandleImage = function (fileName, mimeType) {
    return function (res) {
        return function (callback) {
            return function (fileBuffer) {
                const promiseJimp = new Promise((resolve, reject) => {
                    //将原图压缩
                    Jimp.read(fileBuffer, function (err, data) {
                        if (err) return reject(err)
                        const length = fileBuffer.length
                        let quality
                        if (length < 2000000) {
                            //小于2mb
                            quality = 80;
                        } else if (length < 4000000) {
                            //小于2mb
                            quality = 30;
                        } else if (length < 60000000) {
                            quality = 20;
                        } else if (length < 8000000) {
                            quality = 12;
                        } else {
                            quality = 10;
                        }
                        data.scale(0.5);
                        data.quality(quality)
                        console.log(`mimeType：${mimeType}`)
                        console.log(`quality: ${quality}`)
                        if (mimeType === 'image/png') {
                            data.rgba(true);             // set whether PNGs are saved as RGBA (true, default) or RGB (false)
                            data.filterType(-1);     // set the filter type for the saved PNG （-1-4）
                            data.deflateLevel(9);   // set the deflate level for the saved PNG (0-9)
                            data.deflateStrategy(0); // set the deflate for the saved PNG (0-3)
                            data.scale(0.5)
                        }
                        //data.exifRotate()
                        data.getBuffer(Jimp.AUTO, (err, data) => {
                            if (err) return reject(err)
                            resolve(data)
                        })
                    })
                })
                //压缩后的原图再生成缩略图
                promiseJimp.then((buffer) => {
                    Jimp.read(buffer, function (err, data) {
                        if (err) return res.json(err)
                        const newPromise = new Promise((resolve, reject) => {
                            data.resize(Jimp.AUTO, 150, Jimp.RESIZE_BICUBIC)
                            //data.exifRotate()
                            data.quality(50)
                            data.getBuffer(Jimp.AUTO, function (nothing, image) {
                                resolve(image)
                            });
                        })
                        return newPromise.then(data => {
                            callback && callback({
                                compressData: data,
                                sourceBuffer: buffer,
                                compressFile: {   //压缩后，并且声称的缩略图 File类型文件
                                    value: data,
                                    options: {
                                        filename: fileName,
                                        contentType: mimeType
                                    }
                                },
                                sourceFile: {   //压缩后，未声称缩略图的File类型文件
                                    value: buffer,
                                    options: {
                                        filename: fileName,
                                        contentType: mimeType
                                    }
                                }
                            });

                        })
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
}
module.exports.es5HandleImage = es5HandleImage;