# Commands

Assorted stuff I use occasionally enough to need but not often enough to memorize. There are no secrets here.


## AWS

### Glacier
```
# Look at status of a Glacier vault.
aws --profile ablakey@gmail.com glacier describe-vault --account-id - --vault-name google_backups
```



## Ubuntu

### Fixing super slow Git and Curl, etc. because of IPv6
```
# Add to /etc/ssh/ssh_config
AddressFamily inet
```

### Chrome
```
# patch remote debugging into executable.

# If modification is already applied, reset it so that the next line doesn't set extra flags.
sed -i 's@Exec=/usr/bin/google-chrome-stable --remote-debugging-port=9229@Exec=/usr/bin/google-chrome-stable@g' /usr/share/applications/google-chrome.desktop

sed -i 's@Exec=/usr/bin/google-chrome-stable@Exec=/usr/bin/google-chrome-stable --remote-debugging-port=9229@g' /usr/share/applications/google-chrome.desktop
```

## Git
```
# Makes `git push` work more normally.
git config --global push.default current
```

## Web Dev

### Django
```
# Migrate to a specific migration.
python manage devel migrate app_name migration_name
```
