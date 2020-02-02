Create a restful API with nodejs

Link YT: https://www.youtube.com/watch?v=blQ60skPzl0&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=2

Package:
  Express: framework for nodejs
    npm i --save express
  Nodemon for dev:
    npm i --save morgan
  Morgan: middleware for logged
    npm i --save morgan
  Body-parser: middlare for parse body before your handlers, (in property req.body)
    npm install --save body-parser
  CORS: cross origin resource sharing(chia sẻ tài nguyên gốc)
  Mongodb: database
    npm i --save mongoose
  Multer: handle multipart/form-data, upload file
    npm i --save multer
  Bcrypt: mã hóa mật khẩu 
    npm install --save bcrypt-nodejs
  Jsonwebtoken: token (header, payload, signature) for auth
    npm install jsonwebtoken
    pass token in json or in header (Authorization: Bearer token)
  Swagger: tool for 
    npm i swagger-ui-express -S