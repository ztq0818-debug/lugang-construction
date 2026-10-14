const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '打开导航菜单');
}));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '打开导航菜单');
    menuButton.focus();
  }
});

const businessContent = {
  building: { name: '建筑工程', qualification: '施工总承包二级', description: '覆盖酒店、工业厂房、产业园区、科研办公及教育建筑等多种场景，以规范施工和团队协同，落实每一个建设环节。', tags: '酒店建筑 / 工业厂房 / 教育设施' },
  municipal: { name: '市政公用', qualification: '施工总承包二级', description: '参与市政公用工程建设，服务城市基础设施与公共空间。宣传册收录华亭镇云峰村居民污水收集处理工程等项目。', tags: '市政设施 / 污水收集处理 / 公共空间' },
  water: { name: '水利水电', qualification: '施工总承包二级', description: '具备水利水电工程施工总承包二级资质，依托专业人员与施工管理体系，为水利水电工程建设提供施工支持。', tags: '水利水电 / 专业施工 / 工程管理' },
  road: { name: '公路工程', qualification: '施工总承包二级', description: '具备公路工程施工总承包二级资质，结合隧道工程专业承包能力，以质量控制与安全管理支撑道路基础设施建设。', tags: '公路工程 / 隧道工程 / 基础设施' },
  equipment: { name: '机电工程', qualification: '施工总承包二级', description: '具备机电工程施工总承包二级资质，推动机电专业与建筑施工协同，为工程中的设备安装及配套建设提供专业支持。', tags: '机电施工 / 设备配套 / 专业协同' },
  decoration: { name: '装饰装修', qualification: '专业承包一级', description: '面向办公、酒店、餐饮及宴会等空间开展装饰装修。宣传册收录红囍宴婚礼艺术中心、舒友集市海鲜火锅室内装修等项目。', tags: '商业空间 / 办公装修 / 酒店餐饮' }
};
const businessTabs = [...document.querySelectorAll('[data-business]')];
const businessPanel = document.querySelector('#business-panel');
function selectBusiness(button) {
  const item = businessContent[button.dataset.business];
  businessTabs.forEach(tab => {
    const selected = tab === button;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  businessPanel.setAttribute('aria-labelledby', button.id);
  document.querySelector('#business-name').textContent = item.name;
  document.querySelector('#business-qualification').textContent = item.qualification;
  document.querySelector('#business-description').textContent = item.description;
  document.querySelector('#business-tags').textContent = item.tags;
}
businessTabs.forEach((button, index) => {
  button.addEventListener('click', () => selectBusiness(button));
  button.addEventListener('keydown', event => {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % businessTabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + businessTabs.length) % businessTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = businessTabs.length - 1;
    else return;
    event.preventDefault();
    businessTabs[next].focus();
    selectBusiness(businessTabs[next]);
  });
});

const projectCards = [...document.querySelectorAll('[data-project]')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  const filter = button.dataset.filter;
  let count = 0;
  projectCards.forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
    if (!card.hidden) count++;
  });
  document.querySelector('.projects-grid').classList.toggle('filtered', filter !== 'all');
  document.querySelector('#project-count').textContent = `${String(count).padStart(2, '0')} / SELECTED`;
}));

const projectDetails = {
  crowne: { title: '莆田皇冠假日酒店', category: '酒店文旅 · 福建莆田', image: 'assets/crowne-plaza-putian.jpg', alt: '莆田皇冠假日酒店建筑实景', description: '项目位于福建省莆田市荔城区玉湖片区。建筑包含酒店客房、宴会厅、各式餐厅、多功能厅、娱乐中心等配套设施，以复合功能承载多元旅居与商务需求。', facts: [['项目位置', '莆田市荔城区玉湖片区'], ['总建筑面积', '约 64,000 ㎡']] },
  hongbao: { title: '宏宝药械物流园', category: '产业物流 · 福建莆田', image: 'assets/hongbao-logistics-front.jpg', alt: '宏宝药械物流园项目建筑实景', description: '项目坐落于福建省莆田市秀屿区清塘大道南侧。宣传册收录园区建筑实景，展现大型产业空间的建设成果。', facts: [['项目位置', '莆田市秀屿区清塘大道南侧'], ['建设规划用地面积', '66,463.24 ㎡'], ['建筑占地总面积', '29,910.72 ㎡']] },
  nanri: { title: '南日云海山庭酒店', category: '酒店文旅 · 福建莆田', image: 'assets/nanri-yunhai-hotel.jpg', alt: '南日云海山庭酒店入口实景', description: '项目位于福建省莆田市秀屿区南日镇海山村，总建筑面积约30,000平方米，计容建筑面积约26,000平方米，不计容建筑面积约4,000平方米。', facts: [['项目位置', '莆田市秀屿区南日镇海山村'], ['总建筑面积', '约 30,000 ㎡'], ['总用地面积', '12,115.90 ㎡']] },
  zhouning: { title: '周宁一中续建工程', category: '教育设施 · 福建宁德', image: 'assets/zhouning-school.jpg', alt: '周宁一中校园入口实景', description: '项目位于周宁县狮城镇，建设宿舍、体育看台、火炬台等校园配套，扩建400米标准跑道与球类场地，并配套大门和围墙，服务校园教学与生活。', facts: [['项目位置', '周宁县狮城镇龙潭街51号'], ['宿舍建筑面积', '7,736.59 ㎡'], ['配套体育设施', '400米标准跑道及球类场地']] },
  hongxiyan: { title: '红囍宴婚礼艺术中心', category: '装饰装修 · 福建莆田', image: 'assets/hongxiyan-interior.jpg', alt: '红囍宴婚礼艺术中心宴会厅装修实景', description: '项目位于福建省莆田市城厢区霞林街道学园南街。室内装修规模约12,000平方米，装修后使用功能为餐厅，宣传册展示了宴会空间的室内实景。', facts: [['项目位置', '莆田市城厢区学园南街1189号'], ['室内装修规模', '12,000 ㎡'], ['使用功能', '餐厅及宴会空间']] }
};
const dialog = document.querySelector('#project-dialog');
let lastProjectButton;
projectCards.forEach(button => button.addEventListener('click', () => {
  const project = projectDetails[button.dataset.project];
  lastProjectButton = button;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-description').textContent = project.description;
  const photo = document.querySelector('#dialog-image');
  photo.src = project.image;
  photo.alt = project.alt;
  const facts = document.querySelector('#dialog-facts');
  facts.replaceChildren(...project.facts.map(([name, value]) => {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    const detail = document.createElement('dd');
    term.textContent = name;
    detail.textContent = value;
    row.append(term, detail);
    return row;
  }));
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('dialog-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastProjectButton?.focus({ preventScroll: true });
});

const navLinks = [...navigation.querySelectorAll('a')];
const sections = [...document.querySelectorAll('main section[id]')];
const activeNavigation = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${visible.target.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-20% 0px -45% 0px', threshold: 0 });
sections.forEach(section => activeNavigation.observe(section));
document.querySelector('#copyright-year').textContent = new Date().getFullYear();
