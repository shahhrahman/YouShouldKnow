#!/usr/bin/env node

const request = require('superagent');
const colors = require('colors');

function rng(start, end){
    return Math.floor(Math.random()*(end-start+1) + start);
}

request.get('https://www.reddit.com/r/YouShouldKnow.json')
        .query({limit:70})
        .set('User-Agent', 'YouShouldKnow')
        .end(function(err, res){
            if(!err && res.ok){
                let randInt = rng(2, 70);
                let postObj = res.body.data.children[randInt].data;
                console.log(postObj.title.blue.inverse.bold);
                console.log(postObj.selftext);
                console.log(('Score: '+ postObj.score.toString()).blue.inverse);
                process.exit(0);
            }
            
            console.log(err? err.red: res.text);
            process.exit(1);
        });