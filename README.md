# Twitter-Archiver

[![Build Status](https://travis-ci.org/sapphiredev/twitter-archiver.svg?branch=master)](https://travis-ci.org/sapphiredev/twitter-archiver)
[![Coverage Status](https://coveralls.io/repos/github/sapphiredev/twitter-archiver/badge.svg?branch=master)](https://coveralls.io/github/sapphiredev/twitter-archiver?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/sapphiredev/twitter-archiver.svg)](https://gemnasium.com/github.com/sapphiredev/twitter-archiver)
[![Maintainability](https://api.codeclimate.com/v1/badges/c51cc69b1da4685e21e5/maintainability)](https://codeclimate.com/github/sapphiredev/twitter-archiver/maintainability)

## Introduction

Automatically backups your timeline

## Installation

### Prerequisites

* Install `redis` and `pm2`

* Create a `.env` file on your project root directory

```sh
PORT={{port}}
key={{key}}
consumer_key={{consumer_key}}
consumer_secret={{consumer_secet}}
access_token={{access_token}}
access_token_secret={{access_token_secert}}
```

### Start

```sh
$ npm i
$ npm run start
```
