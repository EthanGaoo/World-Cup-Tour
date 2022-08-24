\i schema.sql


ALTER SEQUENCE teams_id_seq RESTART WITH 1;
ALTER SEQUENCE activities_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;

\i seed/teams.sql
\i seed/users.sql
\i seed/activities.sql
