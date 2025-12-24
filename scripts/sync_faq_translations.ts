const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const { getSupabaseAdmin } = require('../lib/supabase');

async function syncTranslations() {
    const updates = [
        {
            id: "285793f4-df6d-4633-9b76-b0d509de6f44",
            question_en: "What is the durability of Weet's modular houses?",
            answer_en: "Weet's modular houses utilize a hybrid steel and wood structure combined with rigid polyurethane foam insulation, offering superior durability and energy efficiency compared to conventional buildings. Manufactured under strict quality control, they ensure long-term housing security."
        },
        {
            id: "0de838ac-08c6-469f-a854-564e277627f6",
            question_en: "How long does production and installation take?",
            answer_en: "Factory production takes approximately 4–6 weeks depending on the model, while on-site installation is typically completed within a single day. Excluding the permitting process, the overall construction timeline is reduced by over 50% compared to traditional builds."
        }
    ];

    try {
        const admin = getSupabaseAdmin();
        console.log('--- Synchronizing FAQ translations ---');

        for (const update of updates) {
            const { error } = await admin
                .from('faqs')
                .update({
                    question_en: update.question_en,
                    answer_en: update.answer_en
                })
                .eq('id', update.id);

            if (error) {
                console.error(`Error updating FAQ ${update.id}:`, error.message);
            } else {
                console.log(`Successfully updated translations for FAQ ${update.id}`);
            }
        }

        console.log('Translation sync complete.');
    } catch (e) {
        console.error('Script failed:', e.message);
    }
}

syncTranslations();
