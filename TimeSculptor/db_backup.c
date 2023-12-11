#include <stdio.h>
#include <stdlib.h>

int main() {
    // MySQL database credentials
    const char *db_username = "dev";
    const char *db_password = "TimeSculptor";
    const char *db_name = "localhost";

    // Command to execute mysqldump
    char command[200];
    sprintf(command, "mysqldump -u%s -p%s %s > backup.sql", db_username, db_password, db_name);

    // Execute the command
    int status = system(command);

    if (status == 0) {
        printf("Backup successful. The backup has been saved as TimeSculptorBackup.sql\n");
    } else {
        printf("Backup failed.\n");
    }

    return 0;
}
