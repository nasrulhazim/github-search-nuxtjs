# app

## Database

Create database in MySQL:

```
CREATE DATABASE github;
USE github;
CREATE TABLE `searches` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `term` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `responses` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `searches_type_index` (`type`),
  KEY `searches_term_index` (`term`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

For MySQL username, I use default installed in Mac - `root` and password is empty.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Usage

It's required to have the [GitHub Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) in order to use this application.

The scope should be enough with `repo` only.

Once the token generated, copy it and save it somewhere.

Before use the app, make sure you already install the dependencies as stated in Build Step above. Then run `yarn dev`.

Go to your browser, type: `http://localhost:3000`. You can paste the GitHub Personal Access Token in the Token input. 

Demo usage as per this YouTube [link](https://youtu.be/qIPsyfdJjic)
