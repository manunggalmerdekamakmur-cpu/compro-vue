export const productData = {
  'phc-manunggal-lestari': {
    id: 'phc-manunggal-lestari',
    title: 'PHC Manunggal Lestari',
    description: 'Pupuk Hayati Cair untuk tanaman pangan dan hortikultura. Mengandung mikroorganisme menguntungkan untuk meningkatkan kesuburan tanah dan pertumbuhan tanaman.',
    specs: [
      'Kemasan: 1L, 5L',
      'Kandungan: Mikroorganisme bermanfaat > 10^9 CFU/ml',
      'Manfaat: Meningkatkan kesuburan tanah, pertumbuhan tanaman, dan hasil panen',
      'Aplikasi: Semprot atau siram pada tanah',
      'Izin: No. 03.03.2025.89'
    ],
    features: [
      'Memperbaiki struktur tanah sehingga lebih subur',
      'Membantu penyerapan unsur hara secara optimal',
      'Merangsang pertumbuhan tanaman melalui hormon alami',
      'Melindungi tanaman dari penyakit dan virus',
      'Meningkatkan kualitas dan hasil produksi'
    ],
    benefits: [
      'Meningkatkan hasil panen hingga 30%',
      'Mengurangi penggunaan pupuk kimia',
      'Memperbaiki kualitas tanah secara berkelanjutan'
    ],
    images: [
      '/assets/img/manunggal-lestari/manunggal-lestari.webp',
      '/assets/img/manunggal-lestari/phc-manunggal-lestari-1lbiru.webp',
      '/assets/img/manunggal-lestari/dekomposer-5l.webp'
    ],
    badge: 'Berizin',
    certificate: 'Izin Edar No: 03.03.2025.89',
    status: 'approved'
  },
  'php-tribionik': {
    id: 'php-tribionik',
    title: 'Pupuk Hayati Padat Tribionik',
    description: 'Pupuk Hayati Padat unggulan dengan tiga manfaat utama untuk berbagai jenis tanaman.',
    specs: [
      'Kemasan: 25gr, 100gr',
      'Kandungan: Bakteri menguntungkan, hormon tumbuhan alami',
      'Manfaat: Menyuburkan tanah, merangsang pertumbuhan, melindungi tanaman',
      'Aplikasi: Tabur atau campur dengan media tanam',
      'Merek Terdaftar: IDM001289921'
    ],
    features: [
      'Memperbaiki struktur tanah dan meningkatkan penyerapan unsur hara',
      'Merangsang pertumbuhan tanaman melalui hormon alami',
      'Melindungi tanaman dari penyakit dan virus',
      'Meningkatkan hasil produksi pertanian dan perkebunan'
    ],
    benefits: [
      'Meningkatkan hasil panen 30-50%',
      'Mengurangi penggunaan pupuk kimia hingga 40%',
      'Memperbaiki kualitas tanah jangka panjang'
    ],
    images: [
      '/assets/img/triobionik/triobionik.webp',
      '/assets/img/triobionik/triobionik-100gr.webp',
      '/assets/img/triobionik/triobionik-25gr.webp'
    ],
    badge: 'Berizin',
    certificate: 'Merek Terdaftar: IDM001289921',
    status: 'approved'
  },
  'manunggal-makmur': {
    id: 'manunggal-makmur',
    title: 'Pupuk Organik Remah Manunggal Makmur',
    description: 'Pupuk organik remah untuk pertanian berkelanjutan - dalam proses perizinan.',
    specs: [
      'Kemasan: 5kg, 25kg, 40kg, 50kg',
      'Bentuk: Remah/granul',
      'Bahan: Organik 100%',
      'Status: Dalam proses perizinan'
    ],
    features: [
      'Menyuburkan tanah secara alami',
      'Meningkatkan kandungan organik tanah',
      'Ramah lingkungan dan berkelanjutan',
      'Cocok untuk semua jenis tanaman'
    ],
    benefits: [
      'Meningkatkan kesuburan tanah jangka panjang',
      'Memperbaiki struktur fisik tanah',
      'Meningkatkan kapasitas tukar kation tanah'
    ],
    images: [
      '/assets/img/manunggal-makmur/manunggal-makmur.webp',
      '/assets/img/manunggal-makmur/por-5.webp',
      '/assets/img/manunggal-makmur/por-25.webp'
    ],
    badge: 'Segera Hadir',
    status: 'coming-soon'
  },
  'ptorca': {
    id: 'ptorca',
    title: 'Pupuk Organik Cair PTORCA',
    description: 'Pupuk organik cair untuk tanaman pangan dan hortikultura - proses izin edar.',
    specs: [
      'Kemasan: 500ml, 1L, 5L',
      'Kandungan: Nutrisi organik lengkap',
      'Status: Dalam proses perizinan',
      'Target: Tanaman pangan dan hortikultura'
    ],
    features: [
      'Mudah diserap oleh tanaman',
      'Mengandung nutrisi lengkap',
      'Ramah lingkungan',
      'Aplikasi praktis dan efisien'
    ],
    benefits: [
      'Mempercepat pertumbuhan vegetatif',
      'Meningkatkan pembungaan dan pembuahan',
      'Memperbaiki kualitas hasil panen'
    ],
    images: [
      '/assets/img/ptorca/ptorca.webp',
      '/assets/img/ptorca/ptorca-5l.webp',
      '/assets/img/ptorca/ptorca-1l.webp'
    ],
    badge: 'Segera Hadir',
    status: 'coming-soon'
  }
}

export const getAllProducts = () => Object.values(productData)
export const getApprovedProducts = () => Object.values(productData).filter(p => p.status === 'approved')
export const getComingSoonProducts = () => Object.values(productData).filter(p => p.status === 'coming-soon')
export const getProductById = (id) => productData[id]