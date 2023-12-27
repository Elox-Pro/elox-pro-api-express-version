import DBSeeder from "../src/helpers/DBSeeder";

(async function main() {

    try {
        console.log('Running...');

        const seeder = new DBSeeder();
        await seeder.seed();

        console.log('...Done! ✅');

    } catch (error) {
        console.error('🚨 Error seeding database', error);
    }

})();
