import { createReadStream } from 'fs'
import https from 'https'
import { Readable } from 'stream'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

exports = module.exports = fnProto(function SauceNAO(...args) {
  let api_key
  if(new.target) {
    api_key = args[0]
    if(!api_key || typeof api_key !== 'string')
      throw new TypeError('no api_key passed to constructor')
    return fnProto(getSauce)
  } else return getSauce(...args)

  async function getSauce(input, options) {
    let form = new FormData()
    if(Object(options) === options)
      for(let key in options) form.append(key, options[key])

    form.append('output_type', 2)
    if(api_key) form.append('api_key', api_key)

    switch(true) {
      case (typeof input === 'string'):
        if(~input.search(/^https?:\/\//))
          form.append('url', input)
        else
          form.append('file', createReadStream(input))
      break

      case (input instanceof Readable):
        form.append('file', input)
      break

      case (input instanceof Buffer):
        let inputType = fileTypeFromBuffer(input)
        form.append('file', input, {
          filename: `file.${inputType.ext}`,
          contentType: inputType.mime
        })
      break

      default: throw new TypeError('unrecognized input format')
    }

    let response = await new Promise((resolve, reject) => {
      form.submit('https://saucenao.com/search.php', (err, res) => {
        if(err) reject(err)
        else resolve(res)
      })
    })

    try {
      response.body = ''
      response.setEncoding('utf8')
      response.on('data', chunk => response.body += chunk)
      await new Promise(r => response.on('end', r))

      response.json = JSON.parse(response.body)
    } catch (err) {
      err.response = response
      throw err
    }

    return response
  }
})
exports.prototype = {}

function fnProto(fn) {
  return new Proxy(fn, {
    getPrototypeOf(target) {
      return exports.prototype
    }
  })
}