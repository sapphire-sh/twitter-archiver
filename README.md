# Twitter-Archiver

[![Build Status](https://travis-ci.org/sapphiredev/twitter-archiver.svg?branch=master)](https://travis-ci.org/sapphiredev/twitter-archiver)
[![Coverage Status](https://coveralls.io/repos/github/sapphiredev/twitter-archiver/badge.svg?branch=master)](https://coveralls.io/github/sapphiredev/twitter-archiver?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/c51cc69b1da4685e21e5/maintainability)](https://codeclimate.com/github/sapphiredev/twitter-archiver/maintainability)

## Introduction

Automatically backups your timeline

## Installation

### Prerequisites

- Install `mariadb` and `pm2`

- Create a `.env` file on your project root directory

```sh
PORT={{port}}
CONSUMER_KEY={{consumer_key}}
CONSUMER_SECRET={{consumer_secet}}
ACCESS_TOKEN={{access_token}}
ACCESS_TOKEN_SECRET={{access_token_secert}}
DATABASE_HOST={{database_host}}
DATABASE_USER={{database_user}
DATABASE_PASSWORD={{database_password}}
DATABASE_NAME={{database_name}}
```

### Start

```sh
$ npm i
$ npm run start
```
