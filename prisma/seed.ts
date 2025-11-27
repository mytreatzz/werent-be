import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function getRandomRating() {
    return Math.floor(Math.random()*4)+2
}

async function main () {
try {
    console.log('🌱 Starting database seeding...\n');
    const reviews = [
        {
            avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
            rating: getRandomRating(),
            measurement: '168 CM 63 KG 88/76/96 CM',
            likeCount: 0,
            comment: 'fits well and feels okay. nothing special but not bad either.',
            createdAt: new Date('2025-02-10'),
        },
        {
            avatarUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
            rating: getRandomRating(),
            measurement: '160 CM 55 KG 84/70/92 CM',
            likeCount: 0,
            comment: 'the design is simple and clean. the material could be a bit thicker.',
            createdAt: new Date('2025-03-15'),
        },
        {
            avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
            rating: getRandomRating(),
            measurement: '175 CM 70 KG 92/80/98 CM',
            likeCount: 0,
            comment: 'nice overall. the stitching is decent but the fit is slightly loose.',
            createdAt: new Date('2025-04-20'),
        },
        {
            avatarUrl: 'https://randomuser.me/api/portraits/women/52.jpg',
            rating: getRandomRating(),
            measurement: '158 CM 50 KG 82/68/90 CM',
            likeCount: 0,
            comment: 'comfortable enough for daily use. color fades a little after washing.',
            createdAt: new Date('2025-05-18'),
        },
        {
            avatarUrl: 'https://randomuser.me/api/portraits/men/77.jpg',
            rating: getRandomRating(),
            measurement: '180 CM 75 KG 96/82/104 CM',
            likeCount: 0,
            comment: 'lightweight and soft. the size runs a bit smaller than expected.',
            createdAt: new Date('2025-02-28'),
        },
        {
            avatarUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
            rating: getRandomRating(),
            measurement: '165 CM 58 KG 86/72/94 CM',
            likeCount: 0,
            comment: 'looks good and feels okay. could be better in terms of durability.',
            createdAt: new Date('2025-03-05'),
        },
        {
            avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
            rating: getRandomRating(),
            measurement: '172 CM 68 KG 90/78/100 CM',
            likeCount: 0,
            comment: 'the texture is smooth and the weight is nice. the packaging was a bit rough.',
            createdAt: new Date('2025-01-17'),
        },
        {
            avatarUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
            rating: getRandomRating(),
            measurement: '162 CM 60 KG 88/74/96 CM',
            likeCount: 0,
            comment: 'quality is decent for the price. fits slightly tighter on the sleeves.',
            createdAt: new Date('2025-04-01'),
        },
        {
            avatarUrl: 'https://randomuser.me/api/portraits/men/90.jpg',
            rating: getRandomRating(),
            measurement: '178 CM 72 KG 94/80/102 CM',
            likeCount: 0,
            comment: 'simple and comfortable. a few loose threads but nothing major.',
            createdAt: new Date('2025-06-01'),
        },
        {
            avatarUrl: 'https://randomuser.me/api/portraits/women/63.jpg',
            rating: getRandomRating(),
            measurement: '155 CM 48 KG 80/66/88 CM',
            likeCount: 0,
            comment: 'nice color and decent comfort. could use more size options.',
            createdAt: new Date('2025-03-22'),
        },        
    ]
    console.log('✅ Database seeding completed successfully!\n');
    for (const review of reviews) {
        review.comment = capitalizeFirstLetter(review.comment);
        review.rating = getRandomRating();
        await prisma.review.create({
            data: review
        })
    }

    console.log('Database seeded successfully');
}catch(error) {
    console.error('Error seeding the database:', error);
    await prisma.$disconnect();
    process.exit(1)
}finally {
    await prisma.$disconnect();
}
}

main()