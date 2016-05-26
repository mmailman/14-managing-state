(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // The route is when you hit /article/:id for this method
  articlesController.loadById = function(ctx, next) {
    //this function is passed in as a callback function to the Article.findWhere method
    var articleData = function(article) { //article parameter is an array containing an object, and the object is the actual artcle data
      ctx.articles = article;

      // this next() call, calls the next callback function in the route articlesController.index
      next();
    };

    //this method does a webDB call to select data based on id and the ctx id
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // The route is when you hit /author/:authorName for this method
  articlesController.loadByAuthor = function(ctx, next) {
    //This function is also passed into the Article.findWhere method
    var authorData = function(articlesByAuthor) { // is an array of matching article objects by author
      ctx.articles = articlesByAuthor;

      // this next() call, calls the next callback function in the route articlesController.index
      next();
    };
    //this method does a webDB call to select data based on author and the ctx authorName
    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // The route is when you hit /category/:categoryName for this method
  articlesController.loadByCategory = function(ctx, next) {
    //This function is also passed into the Article.findWhere method
    var categoryData = function(articlesInCategory) { // is an array of matching article objects by category
      ctx.articles = articlesInCategory;

      // this next() call, calls the next callback function in the route articlesController.index
      next();
    };

    //this method does a webDB call to select data based on category and the ctx categoryName
    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // The route is when you hit '/' for this method or if the default value is selected on the category or object filter
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) { //This parameter is not necessary we are assigning a globally available array to the ctx here.
      ctx.articles = Article.all;

      // this next() call, calls the next callback function in the route articlesController.index
      next();
    };

    if (Article.all.length) { //If array has data assign the arry to articles context
      ctx.articles = Article.all;

      // this next() call, calls the next callback function in the route articlesController.index
      next();
    } else {
      Article.fetchAll(articleData); //If array is empty the Article.fetchAll method is executed.
    }
  };


  module.articlesController = articlesController;
})(window);
