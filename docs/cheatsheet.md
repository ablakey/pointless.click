# Cheat Sheet

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

## Backups

### Restic

Restic wants to dump files into a "repo" which I think is just going to be a file structure in your backup destination.

This ends up in a segmented, encrypted Restic format. So the only way to get the data back is to use Restic and to remember the password.

```
# Probably add to your .bashrc
export B2_ACCOUNT_ID="<MY_ACCOUNT_ID>"
export B2_ACCOUNT_KEY="<MY_SECRET_ACCOUNT_KEY>"

# To initialize.
restic -r b2:my-restic-bucket-name init

# To upload a backup.
restic -r b2:bucket-name backup ~/Downloads/file_to_backup.tgz

# Or even better... mount it as a filesystem.
sudo mkdir /mnt/restic
sudo chown ablakey:ablakey /mnt/restic/
restic -r /srv/restic-repo mount /mnt/restic

# To restore from a backup.
restic -r b2:bucket-name restore latest --target file_to_restore.tgz
```
