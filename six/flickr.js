"use strict"

requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  }
});

require([
  'ramda',
  'jquery'
  ],
  (_, $) => {
    let impure = {
      getJSON: _.curry((cb, url) => $.getJSON(url, cb)),
      setHTML: _.curry((sel, html) => $(sel).html(html))
    };

    let trace = _.curry((tag, x) => {
      console.log(tag, x);
      return x;
    });

    let url = (term) => 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' +
      term  + '&format=json&jsoncallback=?';

    let image = (url) => $('<img/>', { src: url });

    let mediaUrl = _.compose(_.prop('m'), _.prop('media')),
      srcs = _.compose(_.map(mediaUrl), _.prop('items')),
      imgs = _.compose(_.map(image), srcs),
      renderImages = _.compose(impure.setHTML('body'), imgs),
      app = _.compose(impure.getJSON(renderImages), url);

    app('cats');
  }
);
