heroku pg:backups:capture
heroku pg:backups:download
rm -f latest.dump
mv latest.dump.1 latest.dump