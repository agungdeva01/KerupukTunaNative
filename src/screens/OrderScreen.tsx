import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';

// --- Data Dummy Item Order (Contoh dari ProductScreen, dengan tambahan quantity) ---
// Catatan: Dalam aplikasi nyata, data ini akan diambil dari state/store manajemen.
const DUMMY_ORDER_ITEMS = [
    { id: '1', name: 'Kerupuk Tuna Original', price: 15000, quantity: 2, imageUri: require('../assets/images/Original.png') }, 
    { id: '2', name: 'Kerupuk Tuna Pedas', price: 25000, quantity: 1, imageUri: require('../assets/images/Pedes.png') },
    { id: '3', name: 'Kerupuk Tuna Rasa Sayange', price: 18000, quantity: 3, imageUri: require('../assets/images/RasaSayange.png') },
    { id: '4', name: 'Kerupuk Tuna untuk wibu (Bawang)', price: 16000, quantity: 1, imageUri: require('../assets/images/Bawang.png') },
];

// Menghitung total harga dari item dummy
const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

const totalAmount = calculateTotal(DUMMY_ORDER_ITEMS);

// --- Komponen Item Dalam Keranjang ---
const OrderItemCard = ({ item }) => (
    <View style={styles.itemContainer}>
        {/* Menggunakan Image.resolveAssetSource untuk memastikan URI gambar bekerja */}
        <Image 
            source={item.imageUri} 
            style={styles.itemImage} 
        />
        <View style={styles.itemDetails}>
            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.itemPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
        </View>
        <View style={styles.itemQuantityArea}>
            <Text style={styles.itemQuantity}>x{item.quantity}</Text>
            <Text style={styles.itemSubtotal}>
                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
            </Text>
        </View>
    </View>
);

// --- Komponen Utama OrderScreen ---
const OrderScreen = () => {
    const handleCheckout = () => {
        alert(`Melanjutkan ke Checkout dengan Total: Rp ${totalAmount.toLocaleString('id-ID')}`);
        // Logika navigasi ke halaman Checkout di sini
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Keranjang Belanja Anda 🛍</Text>
            
            <FlatList
                data={DUMMY_ORDER_ITEMS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <OrderItemCard item={item} />}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => <Text style={styles.emptyText}>Keranjang Anda kosong.</Text>}
            />

            {/* Ringkasan Total dan Tombol Checkout */}
            <View style={styles.summaryContainer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Pembayaran:</Text>
                    <Text style={styles.totalAmount}>Rp {totalAmount.toLocaleString('id-ID')}</Text>
                </View>
                
                <TouchableOpacity 
                    style={styles.checkoutButton} 
                    onPress={handleCheckout}
                    disabled={DUMMY_ORDER_ITEMS.length === 0} // Nonaktifkan jika kosong
                >
                    <Text style={styles.checkoutButtonText}>Lanjut ke Checkout ({DUMMY_ORDER_ITEMS.length} Item)</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20, // Ruang agar item terakhir tidak tertutup ringkasan
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#666',
    },
    
    // Style untuk OrderItemCard
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#f0f0f0', // Placeholder warna
        resizeMode: 'cover',
    },
    itemDetails: {
        flex: 3,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    itemQuantityArea: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    itemQuantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
    },
    itemSubtotal: {
        fontSize: 15,
        fontWeight: '600',
        color: '#ff5a5f', // Warna merah untuk subtotal
        marginTop: 4,
    },

    // Style untuk Ringkasan Total
    summaryContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000', // Warna hitam pekat untuk total
    },
    
    // Style untuk Tombol Checkout
    checkoutButton: {
        backgroundColor: '#ff5a5f', // Warna Merah/Orange menarik
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OrderScreen;