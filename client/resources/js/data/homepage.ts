export type Product = {
    id: string;
    name: string;
    image: string;
    colors: string[];
};

export type Service = {
    title: string;
    description?: string;
};

export const products: Product[] = [
    {
        id: 'howo-v7-x-dump-truck',
        name: 'Howo v7-x Dump Truck',
        image: '/assets/images/truck1.png',
        colors: ['#F7F7F5', '#D95B40', '#293378'],
    },
    {
        id: 'howo-v7-dump-truck',
        name: 'Howo v7 Dump Truck',
        image: '/assets/images/truck2.png',
        colors: ['#F7F7F5', '#D95B40', '#293378'],
    },
    {
        id: 'howo-tx-dump-truck',
        name: 'Howo TX Dump Truck',
        image: '/assets/images/truck3.png',
        colors: ['#F7F7F5', '#D95B40', '#293378'],
    },
    {
        id: 'howo-a7-t7-prime-mover',
        name: 'Howo A7 | T7 Prime Mover',
        image: '/assets/images/truck4.png',
        colors: ['#F7F7F5', '#D95B40', '#293378'],
    },
    {
        id: 'howo-7-prime-truck',
        name: 'Howo 7 Prime Truck',
        image: '/assets/images/truck5.png',
        colors: ['#F7F7F5', '#D95B40', '#293378'],
    },
    {
        id: 'howo-a7-t7-dump-truck',
        name: 'Howo A7 | T7 Dump Truck',
        image: '/assets/images/truck6.png',
        colors: ['#F7F7F5', '#D95B40', '#293378'],
    },
];

export const services: Service[] = [
    {
        title: 'Preventive Maintenance Services',
        description:
            'To keep your units in tip-top shape and great condition, we conduct PMS.',
    },
    {
        title: 'Truck Rehab',
    },
    {
        title: 'On-Site Rescue',
    },
    {
        title: 'Repair or Replace',
    },
    {
        title: 'Overhauling',
    },
];

export const articles = [
    {
        date: 'March 8, 2025',
        title: 'Archon gives back to Mother Nature',
        image: '/assets/images/news1.png',
    },
    {
        date: 'March 8, 2025',
        title: 'Archon, Sinotruk Strengthen partnership',
        image: '/assets/images/news2.png',
    },
    {
        date: 'March 8, 2025',
        title: 'Philcon Event 2025',
        image: '/assets/images/news3.png',
    },
];
