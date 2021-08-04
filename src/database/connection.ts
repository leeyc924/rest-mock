import mongoose from 'mongoose';

export const connectMongoDb = () => {
  const mongoURI = process.env.MONGO_URI || '';

  if (process.env.NODE_ENV !== 'production') { //개발환경일 경우에만 콘솔 출력
      mongoose.set('debug',true);
  }

  mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
  }, (error)=>{
      if(error)
          console.log('mongodb connect error', error);
      else
          console.log('mongodb connect');
  });
};

mongoose.connection.on('error', (error)=>{
  console.log('mongodb connect error', error);
});

// todo: 연결 실패시 재시도 5번 제한?
// mongoose.connection.on('disconnected',()=>{
//   console.log('mongodb id disconnected. Tying to connect again');
//   connectMongoDb();
// });