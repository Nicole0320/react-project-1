import AV from 'leancloud-storage'

var APP_ID = 'dEcDHn4zKeNSGMScvNt2tskE-gzGzoHsz';
var APP_KEY = 'n70Nk5NkKB40QWKLD4fL45Gs';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV;

export function signUp(username, password, successFn, errorFn){
  //新建AVUser实例对象
  var user = new AV.User();
  //设置用户名
  user.setUsername(username);
  //设置密码
  user.setPassword(password);
  //设置处理函数
  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser);
    successFn.call(null, user);
  }, function(error){
    errorFn.call(null, error);
  });

  return undefined;
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id,
    //...是展开运算符，把 AVUser.atrributes 的属性加入当前对象
    ...AVUser.attributes
  }
}

export function getCurrentUser(){
  let user = AV.User.current();
  if(user){
    return getUserFromAVUser(user);
  }
  else{
    return null;
  }
}

export function signOut(){
  AV.User.logOut();

  return undefined;
}