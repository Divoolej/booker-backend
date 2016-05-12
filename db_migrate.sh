#!/bin/bash
pg_dump -s linkie_development > linkie-devel.sql.dump
heroku pg:reset DATABASE_URL --confirm linkie-backend
heroku pg:psql --app linkie-backend DATABASE < linkie-devel.sql.dump
