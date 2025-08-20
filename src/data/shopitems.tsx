import accessory from '../data/ax/tamper.webp';
import accessory1 from '../data/ax/Portafilter.webp';
import accessory2 from '../data/ax/Frother.jpg';
import accessory3 from '../data/ax/scoop.jpg';

import Espresso0 from '../data/ax/espressoMebachi.jpg';
import Espresso1 from '../data/ax/philipsespresso.png';
import Espresso2 from '../data/ax/creamsmeg.jpg';
import Espresso3 from '../data/ax/blusmeg.jpg';
import EspressoR from '../data/ax/SmegRed.webp';
import Espresso4 from '../data/ax/hand-powered-portable-espresso-.jpg';
import EspressoG from '../data/ax/Nanopresso_Green.webp';
import EspressoO from '../data/ax/NanopressoOrange.webp';

import Grinder0 from '../data/ax/mebachigrinder.jpg';
import Grinder1 from '../data/ax/smeggrinder.webp';
import Grinder2 from '../data/ax/manual Coffee Grinder.webp';
import Grinder3 from '../data/ax/hario-skerton-handgrinder.webp';

import Coffee0 from '../data/ax/Beans.jpg';
import Coffee1 from '../data/ax/grinded.jpeg';
import Coffee2 from '../data/ax/capsulemild.jpg';
import Coffee3 from '../data/ax/capsuledark.jpg';

import type { Product } from '../../src/data/product';

export const Espresso: Product[] = [
    {
        title: 'Espresso Machine',
        description: 'Mabachi M-202',
        price: 10000000,
        image: Espresso0,
        category: 'Espresso Machines',
        id: 1
    },
    {
        title: 'Espresso Machine',
        description: 'Philips Series 5000 Fully Automatic',
        price: 12000000,
        image: Espresso1,
        category: 'Espresso Machines',
        id: 2
    },
    {
        title: 'Espresso Machine',
        description: 'Smeg 50’s Retro Style',
        price: 55000000,
        image: Espresso2,
        category: 'Espresso Machines',
        colors: [
            { name: 'cream', code: '#f5f5dc', image: Espresso2 },
            { name: 'Blue', code: '#0000ff', image: Espresso3 },
            { name: 'red', code: '#FF0000', image: EspressoR },
        ],
        id: 3
    },
    {
        title: 'Wacaco Minipresso GR',
        description: 'Hand-powered espresso machine',
        price: 3500000,
        image: Espresso4,
        category: 'Espresso Machines',
        colors: [
            { name: 'black', code: '#000000', image: Espresso4 },
            { name: 'orange', code: "#FF6F00", image: EspressoO },
            { name: 'green', code: "#4B8F29", image: EspressoG },
        ],
        id: 4
    },
];

export const Grinder: Product[] = [
    {
        title: 'Electric Coffee Grinder',
        description: 'Mabachi M-110',
        price: 7000000,
        image: Grinder0,
        category: 'Grinders',
        id: 5
    },
    {
        title: 'Electric Coffee Grinder',
        description: 'Smeg Coffee Grinder(CGF01)',
        price: 28000000,
        image: Grinder1,
        category: 'Grinders',
        id: 6
    },
    {
        title: 'Manual Coffee Grinder',
        description: 'Hario Skerton Pro',
        price: 3000000,
        image: Grinder2,
        category: 'Grinders',
        id: 7
    },
    {
        title: 'Manual Coffee Grinder',
        description: 'Porlex Mini',
        price: 2750000,
        image: Grinder3,
        category: 'Grinders',
        id: 8
    },
];

export const Coffee: Product[] = [
    {
        title: 'HESS Coffee mixture',
        description: 'Beans - 250gr',
        price: 300000,
        image: Coffee0,
        category: 'Coffee',
        id: 9
    },
    {
        title: 'HESS Coffee mixture',
        description: 'Grinded - 250gr',
        price: 300000,
        image: Coffee1,
        category: 'Coffee',
        id: 10
    },
    {
        title: 'Nesspresso Capsules',
        description: 'dark - Starbucks',
        price: 450000,
        image: Coffee2,
        category: 'Coffee',
        id: 11
    },
    {
        title: 'Nesspresso Capsules',
        description: 'mild - Starbucks',
        price: 450000,
        image: Coffee3,
        category: 'Coffee',
        id: 12
    },
];

export const Accessories: Product[] = [
    {
        title: 'Tamper',
        description: 'Coffee tamper tool',
        price: 500000,
        image: accessory,
        category: 'Accessories',
        id: 13
    },
    {
        title: 'Portafilter',
        description: 'Filter holder for espresso machine',
        price: 1500000,
        image: accessory1,
        category: 'Accessories',
        id: 14
    },
    {
        title: 'Milk Frother',
        description: 'Handheld milk frother',
        price: 450000,
        image: accessory2,
        category: 'Accessories',
        id: 15
    },
    {
        title: 'Espresso Scoop',
        description: 'Coffee measuring scoop',
        price: 200000,
        image: accessory3,
        category: 'Accessories',
        id: 16
    },
];

export const shopItems = [...Espresso, ...Grinder, ...Accessories, ...Coffee];
