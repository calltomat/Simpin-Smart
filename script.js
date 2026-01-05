// array untuk menyimpan data transaksi
var daftarTransaksi = [];

// validasi dan simpan transaksi
document.getElementById('transaksiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // ambil value dari form
    var nama = document.getElementById('namaAnggota').value.trim();
    var jenis = document.getElementById('jenisTransaksi').value;
    var jumlah = document.getElementById('jumlah').value;
    var tanggal = document.getElementById('tanggal').value;
    var kategori = document.getElementById('kategori').value.trim();

    // reset semua error dulu
    var semuaError = document.querySelectorAll('.error');
    semuaError.forEach(function(error) {
        error.style.display = 'none';
    });

    // validasi input
    var valid = true;

    if (nama === '') {
        document.getElementById('errorNama').style.display = 'block';
        valid = false;
    }

    if (jenis === '') {
        document.getElementById('errorJenis').style.display = 'block';
        valid = false;
    }

    if (jumlah === '' || jumlah <= 0) {
        document.getElementById('errorJumlah').style.display = 'block';
        valid = false;
    }

    if (tanggal === '') {
        document.getElementById('errorTanggal').style.display = 'block';
        valid = false;
    }

    // kalau semua valid, masukin ke array
    if (valid) {
        var transaksi = {
            nama: nama,
            jenis: jenis,
            jumlah: parseInt(jumlah),
            kategori: kategori || '-',
            tanggal: tanggal
        };

        daftarTransaksi.push(transaksi);
        
        updateTabel();
        
        // reset form
        document.getElementById('transaksiForm').reset();
        
        alert('Transaksi berhasil disimpan!');
    }
});

// fungsi update tabel transaksi
function updateTabel() {
    var tbody = document.getElementById('transaksiBody');
    
    // kalau belum ada data
    if (daftarTransaksi.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">Belum ada transaksi</td></tr>';
        return;
    }

    // hapus isi tbody
    tbody.innerHTML = '';
    
    // tampilin semua data
    for (var i = 0; i < daftarTransaksi.length; i++) {
        var baris = tbody.insertRow();
        var transaksi = daftarTransaksi[i];
        
        baris.insertCell(0).innerHTML = i + 1;
        baris.insertCell(1).innerHTML = transaksi.nama + ' - ' + transaksi.jenis;
        baris.insertCell(2).innerHTML = 'Rp ' + transaksi.jumlah.toLocaleString('id-ID');
        baris.insertCell(3).innerHTML = transaksi.kategori;
        baris.insertCell(4).innerHTML = transaksi.tanggal;
    }
}
