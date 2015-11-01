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

    let mediaUrl = _.compose(_.prop('m'), _.prop('media')),   // retrieves the url of an image
      mediaToImg = _.compose(image, mediaUrl),                // url -> <img src="picture">
      imgs = _.compose(_.map(mediaToImg), _.prop('items')),   // retrieve items[] from JSON response
      renderImages = _.compose(impure.setHTML('body'), imgs), // set <img>s in body
      app = _.compose(impure.getJSON(renderImages), url);     // make API call

    app('cats');
  }
);
