var app = app || {};
var $newsSection = $("<div></div>")
    .addClass("news-section");
var favorites = [];

app.usNews = {
  newsIsSelected: false,
  favoriteIsSelected: false,
  articles: [],

  loadNews: function() {
    if(this.newsIsSelected === false) {
      this.newsIsSelected = true;
      var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
      url += '?' + $.param({
        'api-key': "cdfed350029d4d2fb2d4ab135625ef38"
      });
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        var results = result.results;
        var usNews = results.filter(function(elem) {
            return elem.section === "U.S.";
        });
        this.articles = createUSArticles(usNews);
        generateHTML(this.articles);
      }).fail(function(err) {
        throw err;
      });
    }
    else {
      this.newsIsSelected = false;
      $newsSection.html("<div></div>");
    }
  }
}

app.worldNews = {
  newsIsSelected: false,
  favoriteIsSelected: false,
  articles: [],

  loadNews: function() {
    if(this.newsIsSelected === false) {
      this.newsIsSelected = true;
      var url = "https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=f7d777dd590f4499b60f98b364889bf0";
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        var results = result.articles;
        this.articles = createArticles(results);
        generateHTML(this.articles);
      }).fail(function(err) {
        throw err;
      });
    }
    else {
      this.newsIsSelected = false;
      $newsSection.html("<div></div>");
    }
  },
}

app.sportsNews = {
  newsIsSelected: false,
  favoriteIsSelected: false,
  articles: [],

  loadNews: function(isReload) {
    if(this.newsIsSelected === false) {
      this.newsIsSelected = true;
      var url = "https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=f7d777dd590f4499b60f98b364889bf0";
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        var results = result.articles;
        this.articles = createArticles(results);
        generateHTML(this.articles);
      }).fail(function(err) {
        throw err;
      });
    }
    else {
      this.newsIsSelected = false;
      $newsSection.html("<div></div>");
    }
  },
}

app.weatherNews = {
  newsIsSelected: false,
  favoriteIsSelected: false,
  articles: [],

  loadNews: function(isReload) {
    if(this.newsIsSelected === false) {
      this.newsIsSelected = true;
      var url = "http://api.openweathermap.org/data/2.5/weather?q=Rochester&appid=031ed79f9ca69fe23e8e32428252cad6";
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        var results = result.main;
        this.articles = createArticles(results);
        generateWeatherHTML(this.articles);
      }).fail(function(err) {
        throw err;
      });
    }
    else {
      this.newsIsSelected = false;
      $newsSection.html("<div></div>");
    }
  },
}

app.technologyNews = {
  newsIsSelected: false,
  favoriteIsSelected: false,
  articles: [],

  loadNews: function(isReload) {
    if(this.newsIsSelected === false) {
      this.newsIsSelected = true;
      var url = "https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=f7d777dd590f4499b60f98b364889bf0";
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        var results = result.articles;
        this.articles = createArticles(results);
        generateHTML(this.articles);
      }).fail(function(err) {
        throw err;
      });
    }
    else {
      this.newsIsSelected = false;
      $newsSection.html("<div></div>");
    }
  },
}


function generateHTML(articles) {
  var count = 1;
  articles.forEach(function(article) {
    var articleNum = "article" + count;
    var $articleDiv = $("<div></div>")
      .addClass("jumbotron");

    var $title = $("<h3/>")
      .addClass("title")
      .addClass(articleNum)
      .text(article.title);

    var $image = $("<img />")
      .addClass("image")
      .addClass(articleNum)
      .attr("src", article.imageURL);

    var $description = $("<p/>")
      .addClass("description")
      .addClass(articleNum)
      .text(article.description);

    var $url = $("<a/>")
      .addClass("url")
      .addClass(articleNum)
      .attr("href", article.url)
      .text(article.title);
    
    var $favorite = $("<input />")
      .addClass("favorite")
      .addClass(articleNum)
      .attr("type", "checkbox");
    
    //console.log(".favorite" + "." + articleNum);

    $(".favorite" + "." + articleNum).click(function() {
      console.log("clicked");
      if($(".favorite " + articleNum).checked) {
        favorites.append(article);
      }
      else {
        favorites = _.reject(favorites, function(el) {
          return el.title = article.title;
        });
      }
    });
    

    var $label = $("<label />")
      .addClass("favorite-label")
      .addClass(articleNum)
      .text("Favorite");


    $articleDiv.append($title);
    $articleDiv.append($image);
    $articleDiv.append($description);
    $articleDiv.append($url);
    $articleDiv.append("<br />");
    $articleDiv.append("<br />");
    $articleDiv.append($label);
    $articleDiv.append($favorite);

    $newsSection.prepend($articleDiv);
    count++;
  });
  $(".content").prepend($newsSection);
}


function USArticleObj(rawArticle) {
  this.title = rawArticle.title;
  this.imageURL = rawArticle.multimedia[4].url;
  this.description = rawArticle.description;
  this.url = rawArticle.url;
  this.favorite = false;
}

function createUSArticles(articles) {
  return articles.map(function(article) {
    return new USArticleObj(article);
  });
}

function WeatherObj(rawObj) {

}

function createWeatherArticles(articles) {
  return articles.map(function(article) {
    return new USArticleObj(article);
  });
}

function ArticleObj(rawArticle) {
  this.title = rawArticle.title;
  this.imageURL = rawArticle.urlToImage
  this.description = rawArticle.description;
  this.url = rawArticle.url;
  this.favorite = false;
}

function createArticles(articles) {
  return articles.map(function(article) {
    return new ArticleObj(article);
  })
}


function loadUSNews() {
  app.usNews.loadNews();
  reload();
}

function loadWorldNews() {
  app.worldNews.loadNews();
  reload();
}

function loadTechnologyNews() {
  app.technologyNews.loadNews();
  reload();
}


function reload() {
  if(app.usNews.newsIsSelected) {
    app.usNews.loadNews(true);
  }
  if(app.worldNews.newsIsSelected) {
    app.worldNews.loadNews(true);
  }
}