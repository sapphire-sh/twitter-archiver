# Twitter-Archiver

[![Build Status](https://travis-ci.org/sapphiredev/twitter-archiver.svg?branch=master)](https://travis-ci.org/sapphiredev/twitter-archiver)
[![Coverage Status](https://coveralls.io/repos/github/sapphiredev/twitter-archiver/badge.svg?branch=master)](https://coveralls.io/github/sapphiredev/twitter-archiver?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/c51cc69b1da4685e21e5/maintainability)](https://codeclimate.com/github/sapphiredev/twitter-archiver/maintainability)

## Introduction

Automatically backups your timeline

## Installation

### Prerequisites

* Install `mariadb` and `pm2`

* Create a `.env` file on your project root directory

```sh
PORT={{port}}
consumer_key={{consumer_key}}
consumer_secret={{consumer_secet}}
access_token={{access_token}}
access_token_secret={{access_token_secert}}
database_user={{database_user}
database_password={{database_password}}
database_name={{database_name}}
```

### Start

```sh
$ npm i
$ npm run start
```
