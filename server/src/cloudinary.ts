import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary'
import * as fs from 'fs'
import * as path from "path";
import * as uuid from 'uuid'


@Injectable()
export class Cloudinary {

  constructor() {
    cloudinary.v2.config({
      cloud_name: 'techstroy',
      api_key: '849146657754173',
      api_secret: 'TRcK0KvN6cnNIrrepKbzi5KJm-4',
      secure: true
    })
  }

  async uploadImage(image) {
    try {
      const fileName = await this.saveFile(image)
      await cloudinary.v2.uploader.upload(`${__dirname}/static/${fileName}`, {
        public_id: `sparkys/avatars/${fileName.split('.')[0]}`
      })
      return fileName
    } catch (e) {console.log(e)}
  }

  async saveFile(image) {
    const fileName = uuid.v4()+ '.' + image.originalname.split('.')[1]
    const filePath = path.resolve(__dirname, 'static')
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, {recursive: true})
    }
    fs.writeFileSync(path.join(filePath, fileName), image.buffer)
    return fileName
  }

  async deleteFile(fileName) {
    fs.unlink(`${__dirname}/static/${fileName}`, err => console.log(err))
  }
}

