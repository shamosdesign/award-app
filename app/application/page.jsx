"use client";

import { useState } from "react";

export default function ApplicationPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("category", category);
    formData.append("status", "جديد");
    formData.append("idFile", selectedFile); // ملف PDF

    try {
      const res = await fetch("https://wpsite.ctrla-code.com/wp-json/mj-award/v1/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("✅ النتيجة:", data);

      if (res.ok && data.success) {
        setStatusMessage("✅ تم إرسال الطلب بنجاح!");
        setFullName("");
        setEmail("");
        setPhone("");
        setCategory("");
        setSelectedFile(null);
      } else {
        console.error("⚠️ خطأ من السيرفر:", data);
        setStatusMessage("⚠️ حدث خطأ أثناء إرسال الطلب.");
      }
    } catch (err) {
      console.error("❌ فشل الاتصال:", err);
      setStatusMessage("❌ لم يتم الاتصال بالسيرفر.");
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-right text-gray-800 mb-8">
        نموذج التقديم على جائزة سيدة المستقبل
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">الاسم الكامل</label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-right"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-right"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">رقم الهاتف</label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-right"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">الفئة</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-right bg-white"
          >
            <option value="">-- اختر الفئة --</option>
            <option value="ريادة أعمال">ريادة أعمال</option>
            <option value="ابتكار">ابتكار</option>
            <option value="تكنولوجيا">تكنولوجيا</option>
            <option value="تأثير اجتماعي">تأثير اجتماعي</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">رفع الهوية (PDF فقط)</label>
          <input
            type="file"
            name="idFile"
            accept="application/pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {statusMessage && (
          <div className="text-right text-green-600 font-medium">{statusMessage}</div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          إرسال الطلب
        </button>
      </form>
    </section>
  );
}
