import { Logo } from './Nav';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div className="footer-brand">
          <Logo />
          <p>بيّاع ذكي لمتجرك الأونلاين: يرحّب، يرد، يقترح، يتابع، ويذكّر. وأنت ترتاح.</p>
        </div>
        <nav className="footer-cols" aria-label="روابط الموقع">
          <div>
            <b>المنتج</b>
            <a href="#journey">كيف يشتغل</a>
            <a href="#features">المزايا</a>
            <a href="#studio">التخصيص</a>
            <a href="#start">التثبيت</a>
          </div>
          <div>
            <b>المنصات</b>
            <span>سلة</span>
            <span>زد</span>
            <span>Shopify</span>
          </div>
          <div>
            <b>تواصل</b>
            <a href="#faq">الأسئلة الشائعة</a>
            <a href="#start">احجز عرض تجريبي</a>
          </div>
        </nav>
      </div>
      <div className="wrap footer-base">
        <span>© 2026 حيّاك</span>
        <span>صُنع لمتاجر سلة وزد وشوبيفاي</span>
      </div>
    </footer>
  );
}
