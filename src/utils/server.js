import Vue from 'vue'
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

//公共路径
let portUrl = "http://" + window.location.port + "/api/nosum-blog-service/";

//用户注册
const getRegister = (username, password, callback) => {
  let url = '/auth/user/v1/register?username=' + username + '&password=' + password;
  console.log(url);
  service.get(url).then(res => {
    callback && callback(res.data)
  })
}

//用户登录
const UserLogin = (email, password, callback) => {
  let url = portUrl + 'login/UserLogin?email=' + email + '&password=' + password;
  axios.get(url).then(num => {
    callback && callback(num.data);
  })
}
//用户退出
const LoginOut = (token, callback) => {
  let url = portUrl + 'login/LoginOut?token=' + token;
  axios.get(url).then(num => {
    callback && callback(num.data);
  })
}

//文章分类查询
const categoryData = (callback) => {
  if (sessionStorage.getItem('classList')) {
    let data = JSON.parse(sessionStorage.getItem('classList'));// 从session中取得 classList 属性
    callback && callback(data)
  } else {
    let url = '/category/category/v1/list';
    service.get(url).then(res => {
      if (res.data.resultCode === '00000') {
        sessionStorage.setItem('classList', JSON.stringify(res.data.models)); // 将文章分类信息保存到session中
        callback && callback(res.data.models)
      } else {
        alert(res.data.message)
      }
    })
  }
}


//实验室 列表项目
const navMenList = (callback) => {
  if (sessionStorage.getItem('navMenList')) {
    var data = JSON.parse(sessionStorage.getItem('navMenList'));
    callback && callback(data)
  } else {
    let url = portUrl + 'nav/navMenList';
    axios.get(url).then(num => {
      // console.log(num);
      if (num.data.code === 1001) {
        sessionStorage.setItem('navMenList', JSON.stringify(num.data.data));
        callback && callback(num.data.data)
      } else {
        alert("实验室列表-》查询失败")
      }
    })
  }
}

/**
 * 查询文章列表
 */
const ShowArticleAll = (id, keywords, categoryId,callback) => {
  let url = "/posts/posts/v1/list?id="+id+"&keywords="+keywords+"&categoryId="+categoryId;
  service.get(url).then(num => {
    callback && callback(num.data)
  })
}

//查询文章详情
const getArticleInfo = (id,callback) => {
  let url = '/posts/posts/v1/' + id;
  service.get(url).then(res => {
    if (res.data.resultCode === '00000') {
      callback && callback(res.data.model);
    } else {
      alert("文章详情-》查询失败");
    }
  })
}

//查询浏览量最多的10篇文章数据
const showBrowseCount = (callback) => {
  let url = '/posts/posts/v1/viewsHostList';
  service.get(url).then(num => {
    if (num.data.resultCode === '00000') {
      callback && callback(num.data.models);
    }else {
      return;
      // alert("热门文章=》查询失败");
    }
  })
}

//查询最新的10条评论
const ShowArtCommentCount = (callback) => {
  let url = '/comments/comments/v1/listHost';
  service.get(url).then(res => {
    if (res.data.resultCode === '00000') {
      callback && callback(res.data.models);
    } else {
      return;
    }
  })
}
//查询文章评论数据
const ArticleComment = (artId, commentId, callback) => {
  let url = portUrl + 'comment/ArticleComment?art_id=' + artId + '&comment_id=' + commentId;
  axios.get(url).then(res => {
    callback && callback(res.data);
  })
}

//查询其他评论数据
const OtherComment = (leaveId, commentId, callback) => {//分类类型ID（1：赞赏 2：友情链接 3：留言板 4：关于我）
  let url = portUrl + 'comment/OtherComment?leave_id=' + leaveId + '&comment_id=' + commentId;
  axios.get(url).then(res => {
    callback && callback(res.data);
  })
}

//文章评论
const setArticleComment = (content, user_id, article_id, leave_pid, pid, callback) => {
  let url = portUrl + 'comment/setArticleComment?content=' + content + '&user_id=' + user_id + '&article_id=' + article_id + '&leave_pid=' + leave_pid + '&pid=' + pid;
  axios.get(url).then(res => {
    callback && callback(res.data);
  })
}

//其他评论
const setOuthComment = (content, user_id, article_id, leave_id, leave_pid, pid, callback) => {
  let url = portUrl + 'comment/setOuthComment?content=' + content + '&user_id=' + user_id + '&article_id=' + article_id + '&leave_id=' + leave_id + '&leave_pid=' + leave_pid + '&pid=' + pid;
  axios.get(url).then(num => {
    callback && callback(num.data);
  })
}

//查询网址点赞总数
const showLikeData = (callback) => {
  let url = '/auth/auth/v1/likeCount';
  service.get(url).then(num => {
    if (num.data.resultCode === '00000') {
      callback && callback(num.data.model);
    } else {
      alert("点赞总数-》查询失败");
    }
  })
}

//点赞功能修改
const GetLike = (like_num, callback) => {
  let url = portUrl + 'outh/GetLike?like_num=' + like_num;
  axios.get(url).then(num => {
    if (num.data.code == 1001) {
      callback && callback(num.data.msg);
    } else {
      alert("点赞失败");
    }
  })
}

//查询友情链接数据
const FriendUrlData = (callback) => {
  let url = portUrl + 'outh/FriendUrlData';
  axios.get(url).then(num => {
    if (num.data.code == 1001) {
      callback && callback(num.data.data);
    } else if (num.data.code == 1005) {
      return;
    } else {
      alert("友情链接-》查询失败");
    }
  })
}

//查询关于我
const AboutMeData = (callback) => {
  if (sessionStorage.getItem('AboutMeData')) {
    var data = JSON.parse(sessionStorage.getItem('AboutMeData'));
    callback && callback(data)
  } else {
    let url = portUrl + 'outh/AboutMeData';
    axios.get(url).then(num => {
      if (num.data.code == 1001) {
        sessionStorage.setItem('AboutMeData', JSON.stringify(num.data.data));
        callback && callback(num.data.data);
      } else if (num.data.code == 1005) {
        return;
      } else {
        alert("博主信息-》查询失败");
      }
    })
  }
}

//文章点击收藏 点击喜欢
const getArtLikeCollect = (userId, artId, isLike, callback) => {
  var url = '';
  if (isLike === 1) {
    url = portUrl + 'article/getArtLike?user_id=' + userId + '&art_id=' + artId;
  } else {
    url = portUrl + 'article/getArtCollect?user_id=' + userId + '&art_id=' + artId;
  }
  axios.get(url).then(res => {
    if (res.data.code === '00000') {
      callback && callback(res.data.msg);
    } else {
      alert("收藏-》操作失败");
    }
  })
}

//查询赞赏数据
const AdmireData = (callback) => {
  let url = portUrl + 'outh/AdmireData';
  axios.get(url).then(num => {
    if (num.data.code == 1001) {
      callback && callback(num.data);
    } else {
      alert("赞赏数据-》查询失败");
    }
  })
}

//查询用户喜欢列表,查询用户收藏列表
const getLikeCollectList = (userId, artId, articleName, islike, callback) => {
  var url = '';
  if (islike == 1) {
    url = portUrl + 'article/getLikeList?user_id=' + userId + '&art_id=' + artId + '&article_name=' + articleName;
  } else {
    url = portUrl + 'article/getCollectList?user_id=' + userId + '&art_id=' + artId + '&article_name=' + articleName;
  }
  axios.get(url).then(num => {
    callback && callback(num.data);
  })
}

//查询用户信息
const getUserInfo = (userId, callback) => {
  let url = portUrl + 'userInfo/getUserInfo?user_id=' + userId;
  axios.get(url).then(num => {
    if (num.data.code == 1001) {
      callback && callback(num.data);
    } else {
      alert("用户信息-》查询失败");
    }
  })
}
//修改用户信息
const userInfoSave = (obj, callback) => {
  let url = portUrl + 'userInfo/userInfoSave';
  var data = {
    'username': obj.username,
    'user_img': obj.avatar,
    'email': obj.email,
    'sex': obj.sex,
    'friend_start': obj.state,
    'user_id': obj.user_id,
    'frie_name': obj.name,
    'frie_url': obj.url,
    'frie_description': obj.description,
    'friend_img': obj.image,
    'label': obj.label,
    'head_start': obj.head_start,
    'logo_start': obj.logo_start
  };
  // console.log(data);
  axios.get(url, {params: data}).then(num => {
    if (num.data.code == 1001) {
      callback && callback(num.data.msg);
    } else {
      alert("保存失败");
    }
  })
}

//初始化时间
const initDate = (oldDate, full) => {
  if (oldDate === undefined) {return ''}
  if (full === undefined) {return ''}
  let odate = new Date(oldDate);
  let year = odate.getFullYear();
  let month = odate.getMonth() < 9 ? '0' + (odate.getMonth() + 1) : odate.getMonth() + 1;
  let date = odate.getDate() < 10 ? '0' + odate.getDate() : odate.getDate();
  if (full === 'all') {
    return year + '年' + month+ '月' + date + '日';
  } else if (full === 'year') {
    return year
  } else if (full === 'month') {
    return odate.getMonth() + 1
  } else if (full === 'date') {
    return date
  }
}

const formatDate=function (value,type) {// 时间戳转换日期格式方法
  if (value == null) {
    return '';
  } else {
    let date = new Date(value);
    let y = date.getFullYear();// 年
    let MM = date.getMonth() + 1;// 月
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();// 日
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();// 时
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();// 分
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();// 秒
    s = s < 10 ? ('0' + s) : s;
    if (type===1){
      return y + '年' + MM + '月' + d + '日';
    }else{
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  }
}

//获取主题信息
const changeTheme = (callback) => {
  if (sessionStorage.getItem('changeThemeObj')) {
    var data = JSON.parse(sessionStorage.getItem('changeThemeObj'));
    callback && callback(data)
  } else {
    let url = portUrl + 'outh/ThemeMy';
    axios.get(url).then(num => {
      if (num.data.code == 1001) {
        sessionStorage.setItem('changeThemeObj', JSON.stringify(num.data.data))
        callback && callback(num.data.data);
      } else {
        alert("主题信息-》查询失败");
      }
    })
  }
}

export {
  getRegister,//注册
  UserLogin,//登录
  LoginOut,//退出登录
  categoryData,//分类
  navMenList,//导航信息
  ShowArticleAll,//查询文章列表
  getArticleInfo,//文章详情
  showBrowseCount,//流量量做多的文章
  ShowArtCommentCount,//评论最多的文章
  ArticleComment,//文章评论列表
  OtherComment,//其他评论列表
  setArticleComment,//设置文章评论
  setOuthComment,//设置其他评论
  showLikeData,//do you like me
  GetLike,//设置 do you like me
  FriendUrlData,//友情链接数据
  AboutMeData,//关于我文章编写
  getArtLikeCollect,//文章收藏 文章点赞
  AdmireData,//赞赏数据
  getLikeCollectList,//用户收藏喜欢列表
  getUserInfo,//用户信息查询
  userInfoSave,//修改用户信息
  initDate,//设置时间
  changeTheme,//获取主题信息
}
