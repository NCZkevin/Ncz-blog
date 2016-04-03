var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    markdown = require('markdown').markdown;

exports.postarticle = function(req,res){
	  var date = new Date();
  //存储各种时间格式，方便以后扩展
  var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() ;
  // {
  //     date: date,
  //     year : date.getFullYear(),
  //     month : date.getFullYear() + "-" + (date.getMonth() + 1),
  //     day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
  //     minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
  //     date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
  // }

	var post = new Post({title:req.body.title});
	// post.set('post',req.body.post);
	// post.set('tags',req.body.tags);
	// post.set('date',time);

	post.post = req.body.post;
	post.tags = req.body.tags;
	// post.date = time;

	post.save(function(err){
	if (err){

      res.redirect('/edit');
    } else {
      res.redirect('/');
    }
	});
};

exports.getindex = function(req,res){
    if (req.session.user) {
    Post.find().sort({"date": -1}).exec(function(err,posts){
    	posts.forEach(function (post) {
	  post.post = markdown.toHTML(post.post);
	});
    res.render('index', {
      title: '主页',
      user: req.session.user,
      posts: posts,

  });
});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }

};

exports.getone = function(req,res){
	Post.findOne({ title: req.params.title }).exec(function(err,post){

	  post.post = markdown.toHTML(post.post);

		res.render('post',{
			post: post,
		});
	});
}