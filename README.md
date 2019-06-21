# README

# Campoutz

Looking for a camping location for your next camping trip? Explore Campoutz to find public campgrounds across the US. Signup and login to search for campgrounds by State. After login, you have the option to save campgrounds to your favorites for visiting later.

## Demo

Visit [https://campoutz.herokuapp.com/](https://campoutz.herokuapp.com/) to explore the campgrounds around your area. Sign up and login to save your favorites, or use this pre-made account to login:

    $ Username: lorem
    $ Password: password

## Installation

Follow the below terminal commands to start using the application.
(Requirements: Ruby, Rails 5 and Node.js installed)

    $ git clone git@github.com:nichia/campoutz.git
    $ cd campoutz
    Setup server:
      $ rvm --default use 2.6.1  (set default Ruby version 2.6.1)
      $ bundle install
      $ rake db:create
      $ rake db:migrate
      $ rake db:seed
    Setup client:
      $ cd client
      $ mv .env.bak .env  (edit the .env file to fill in secret keys)
      $ npm install
    Start application:
      $ rake start

## Usage

Open up a web browser and copy/paste the IP server address into the web browser URL (usually http://localhost:3000) to use the application.
Sign up and login to save your favorites, or use this pre-made account to login:

    $ Username: lorem
    $ Password: password

## Technical Information

- Front-end: Built using React, Redux, React Router and styled using Semantic UI components. Also integrated with google maps API components to display maps of the campgrounds.
- Back-end: RESTful JSON API built with Ruby on Rails, using PostgreSQL database
- External API:
  - [Recreation Informatin Database (RIDB) API](https://ridb.recreation.gov/docs)
  - [Google Maps React API](https://www.npmjs.com/package/google-maps-react)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/nichia/campoutz.

## License

The application is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
