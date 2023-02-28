# Test project with express and typeorm
Not meant for actual use at this point, only for demonstration purposes.
This API only, UI project is https://github.com/PhlebasThePhoenician/pf-tracker-fe

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` and `data-srouce-migrations.ts` file
3. Launch db and redis: `docker compose up`
4. Run `npm run dev` command

(it should run TypeORM migrations automatically)

#Todo
- way to create initial user, helper for that
- Rename to reflect the fact this is backend (api) only
- way more unittest coverage
- Classvalidator or similar to do typechecking/enforcing
- Proper logger
- budget feature
- balance tranfer features
- reporting featuers
- etc. etc. 
