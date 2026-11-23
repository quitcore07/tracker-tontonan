# Catatan Explore useState & useEffect

## 1. Counter.jsx

### Percobaan 1: Kurangi sampai di bawah 0

Angkanya jadi minus (-1, -2, dst.) karena kodenya cuma mengurangi 1 tanpa batas minimum. Setelah itu saya perbaiki dengan memakai `setCount(Math.max(0, count - 1))` di tombol Kurangi, jadi angkanya berhenti di 0 dan tidak bisa minus lagi.

### Percobaan 2: `count = count + 1` langsung

Tombol Tambah tidak menaikkan angka di layar, sementara Kurangi dan Reset tetap jalan. Menurut saya ini terjadi karena tombol Tambah memakai `count = count + 1`, bukan `setCount(count + 1)`. Kalau count diubah langsung, React tidak tahu ada perubahan, jadi tampilannya tidak diperbarui.

### Percobaan 3: `console.log(count)`

Saya taruh `console.log(count)` di atas `return`. Hasilnya, setiap kali saya klik tombol, di console muncul angka count yang terbaru: [ISI: angka apa aja dan urutannya]. Waktu angka sudah 0 lalu saya klik Kurangi lagi: [ISI: ada baris baru atau tidak]. Dari sini saya paham bahwa setiap state berubah, React menjalankan ulang fungsi Counter dari atas.

### Kesulitan

**Kesulitan 1:** Menulis `</div>` dua kali sehingga halaman error. Solusinya: jumlah tag pembuka dan penutup harus sama.

**Kesulitan 2:** Menulis `math.max` pakai huruf kecil dan sempat terpasang di tombol Reset, bukan Kurangi, jadi angka tetap bisa minus. Solusinya: pakai `Math` (M besar) dan pasang di tombol Kurangi. Saya jadi tahu JavaScript membedakan huruf besar dan kecil.

**Kesulitan 3:** Counter sempat ter-push ke GitHub sebelum bug minusnya diperbaiki. Solusinya: perbaiki kodenya, lalu commit dan push lagi dengan pesan commit baru.

---

## 2. TodoList.jsx

### Percobaan 1: `todos.push(input)` dengan `setInput("")` masih ada

Saya ganti `setTodos([...todos, input])` jadi `todos.push(input)`, sementara baris `setInput("")` masih saya biarkan. Hasilnya kelihatan sama saja, judul baru tetap muncul di daftar. Menurut saya ini terjadi karena `setInput("")` ikut membuat React menggambar ulang layar, jadi judul yang dimasukkan lewat `push` ikut tampil.

### Percobaan 2: `todos.push(input)` tanpa `setInput("")`

Saya hapus baris `setInput("")` sementara. Hasilnya: setelah klik Tambah, judul baru tidak muncul di daftar dan tulisan di kotak input tetap tersangkut di sana. Dari sini saya paham bahwa `push` mengubah data tanpa memberi tahu React, jadi tampilan tidak diperbarui. Supaya layar berubah, harus memakai `setTodos`.

### Kesulitan

Tulisan di kotak input berwarna hitam, sedangkan latar website saya biru gelap, jadi tulisan yang saya ketik hampir tidak terlihat. Penyebabnya kelas `text-black` di input. Solusinya: ganti jadi `text-white` dan beri latar `bg-gray-800` supaya serasi dengan desain website.

---

## 3. FetchData.jsx

(belum dikerjakan)