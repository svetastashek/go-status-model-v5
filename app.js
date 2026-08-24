const archiveSegmentTooltips = {
  delivery: [
    'Накладная подписана грузоотправителем 31 июля 10:26 (UTC +03:00)',
    'Накладная подписана перевозчиком на погрузке 4 августа 18:08 (UTC +03:00)',
    'Получатель принял груз полностью 4 августа 18:11 (UTC +03:00)',
  ],
  'carrier-rejection': [
    'Накладная подписана грузоотправителем 31 июля 10:26 (UTC +03:00)',
  ],
  'transport-cost': [
    'Титул стоимости подписан грузоотправителем 23 июля 16:30 (UTC +03:00)',
  ],
};

document.querySelectorAll('#counterpartyApplicationRows .table-row').forEach((row) => {
  if (row.dataset.status === 'carrier-error' || row.querySelector('.striped')) row.remove();
});

document.querySelectorAll('#draftRows > .table-row').forEach((row) => {
  row.dataset.status = 'draft';
});

const carrierInvoiceVariants = [
  ['TN/202407-558', 'от 17.07', 'ООО «ТрансЛайн»', '+7 495 612-48-20', 'Р248МТ799', 'АО «СтройКомплект»', 'Россия, 141006, Московская область, г. Мытищи, Олимпийский проспект, дом 42', 'Керамическая плитка', '4 360 кг', '96 шт'],
  ['TN/202407-692', 'от 18.07', 'АО «Поволжье Карго»', '+7 843 212-75-40', 'О715КА116', 'ООО «ТехСнаб Казань»', 'Россия, 420054, Республика Татарстан, г. Казань, ул. Техническая, дом 52', 'Промышленные фильтры', '1 780 кг', '34 шт'],
  ['TN/202407-774', 'от 19.07', 'ООО «Сибирский Маршрут»', '+7 383 209-45-12', 'А164МХ799', 'АО «МедСнаб Сибирь»', 'Россия, 630052, Новосибирская область, г. Новосибирск, Толмачёвская ул., дом 43', 'Лабораторное оборудование', '2 240 кг', '8 шт'],
  ['TN/202407-905', 'от 20.07', 'АО «Южный Терминал»', '+7 861 225-14-77', 'В739ХА123', 'ООО «АгроРесурс»', 'Россия, 350072, Краснодарский край, г. Краснодар, ул. Тополиная Аллея, дом 2/1', 'Семена подсолнечника', '9 820 кг', '420 шт'],
  ['TN/202407-143', 'от 21.07', 'ООО «СеверТранс»', '+7 812 335-87-42', 'Н618РВ198', 'АО «Полярный Снаб»', 'Россия, 183038, Мурманская область, г. Мурманск, Промышленная ул., дом 12', 'Кабельная продукция', '2 780 кг', '46 шт'],
  ['TN/202407-268', 'от 22.07', 'ООО «Дон Экспресс»', '+7 863 227-14-50', 'Е591АР161', 'АО «АгроКомплекс Юг»', 'Россия, 344065, Ростовская область, г. Ростов-на-Дону, Орская ул., дом 31', 'Упаковочные материалы', '1 640 кг', '210 шт'],
  ['TN/202407-534', 'от 23.07', 'АО «Урал Магистраль»', '+7 343 288-10-60', 'В742ОС196', 'ООО «ЭнергоМаш»', 'Россия, 620024, Свердловская область, г. Екатеринбург, Елизаветинское шоссе, дом 42', 'Компрессорная установка', '7 460 кг', '3 шт'],
  ['TN/202407-816', 'от 24.07', 'ООО «Восток Логистик»', '+7 3952 29-02-66', 'А206РС138', 'АО «Байкал Ритейл»', 'Россия, 664033, Иркутская область, г. Иркутск, ул. Лермонтова, дом 134', 'Бытовая техника', '5 240 кг', '48 шт'],
];

const carrierInvoiceSources = [...document.querySelectorAll('#counterpartyRows > .table-row')].slice(0, 4);
const carrierInvoiceContainer = document.querySelector('#counterpartyRows');
carrierInvoiceVariants.forEach((data, index) => {
  const [number, date, sender, phone, vehicle, recipient, address, cargo, weight, count] = data;
  const row = carrierInvoiceSources[index % carrierInvoiceSources.length].cloneNode(true);
  const cells = [...row.querySelectorAll(':scope > div')];
  const invoiceCell = cells[0];
  invoiceCell.querySelector('strong').textContent = number;
  invoiceCell.querySelector('.muted').textContent = date;
  cells[1].querySelector('strong').textContent = sender;
  cells[1].querySelector('.muted').replaceChildren(phone, document.createElement('br'), vehicle);
  cells[2].querySelector('strong').textContent = recipient;
  cells[2].querySelector('.muted').textContent = address;
  cells[3].querySelector('strong').textContent = cargo;
  const cargoValues = cells[3].querySelectorAll('span');
  cargoValues[0].textContent = weight;
  cargoValues[1].textContent = count;
  row.dataset.search = `${number} ${sender} ${phone} ${vehicle} ${recipient} ${address} ${cargo} ${weight} ${count}`.toLocaleLowerCase('ru');
  carrierInvoiceContainer.append(row);
});

const carrierRowsInMixedOrder = [...carrierInvoiceContainer.querySelectorAll(':scope > .table-row')]
  .filter((row) => row.dataset.status !== 'unloading');
[0, 2, 1, 3, 6, 4, 7, 5, 9, 11, 8, 10].forEach((index) => {
  carrierInvoiceContainer.append(carrierRowsInMixedOrder[index]);
});

const applicationCarriers = [
  ['ООО «Рольф Эстейт»', 'Россия, 620000, Свердловская область, г. Екатеринбург, ул. Шаумяна, д. 92, стр. 1'],
  ['ООО «Балтика-Транс»', 'Россия, 196240, Санкт-Петербург, Предпортовая ул., д. 8, корп. 2'],
  ['АО «Северная Магистраль»', 'Россия, 163045, Архангельская область, г. Архангельск, Окружное шоссе, д. 11'],
  ['ООО «Волга Карго»', 'Россия, 443022, Самарская область, г. Самара, Заводское шоссе, д. 17, склад 6'],
  ['ООО «Дон Логистик»', 'Россия, 344065, Ростовская область, г. Ростов-на-Дону, Орская ул., д. 31'],
  ['АО «ФармЛогистика»', 'Россия, 142100, Московская область, г. Подольск, Домодедовское шоссе, д. 22'],
  ['ООО «Байкал Экспресс»', 'Россия, 664033, Иркутская область, г. Иркутск, ул. Лермонтова, д. 134'],
  ['АО «УралСтройСнаб»', 'Россия, 620010, Свердловская область, г. Екатеринбург, ул. Черняховского, д. 86'],
];
const applicationPickupPointsData = [
  ['Россия, 396310, Воронежская область, Новоусманский район, с. Новая Усмань, ул. Дорожная, д. 25, стр. 9', '27.05.2026 17:45'],
  ['Россия, 192241, Санкт-Петербург, Софийская ул., д. 96', '28.05.2026 09:30'],
  ['Россия, 420036, Республика Татарстан, г. Казань, Тэцевская ул., д. 5', '29.05.2026 12:15'],
  ['Россия, 630052, Новосибирская область, г. Новосибирск, Толмачёвская ул., д. 43', '30.05.2026 14:20'],
  ['Россия, 350072, Краснодарский край, г. Краснодар, ул. Тополиная Аллея, д. 2/1', '31.05.2026 08:50'],
  ['Россия, 183038, Мурманская область, г. Мурманск, Промышленная ул., д. 12', '01.06.2026 11:10'],
  ['Россия, 620024, Свердловская область, г. Екатеринбург, Елизаветинское шоссе, д. 42', '02.06.2026 16:40'],
  ['Россия, 443022, Самарская область, г. Самара, Заводское шоссе, д. 25', '03.06.2026 10:00'],
];
const applicationCargo = [
  ['Диваны', '370 кг', '18 шт'],
  ['Холодильное оборудование', '1 240 кг', '6 шт'],
  ['Сэндвич-панели', '8 650 кг', '42 шт'],
  ['Медицинские расходные материалы', '940 кг', '215 шт'],
  ['Соки и фруктовые пюре', '4 930 кг', '360 шт'],
  ['Силовой кабель', '3 120 кг', '24 шт'],
  ['Офисная мебель', '2 160 кг', '32 шт'],
  ['Насосная станция', '7 460 кг', '3 шт'],
];

function fillApplicationCell(cell, primaryText, secondaryText = '') {
  cell.replaceChildren();
  if (!primaryText) return;
  const primary = document.createElement('strong');
  primary.textContent = primaryText;
  cell.append(primary);
  if (secondaryText) {
    const secondary = document.createElement('span');
    secondary.className = 'muted address';
    secondary.textContent = secondaryText;
    cell.append(secondary);
  }
}

document.querySelectorAll('#applicationRows > .table-row, #counterpartyApplicationRows > .table-row, #draftApplicationRows > .table-row, #archiveApplicationRows > .table-row').forEach((row, index) => {
  const cells = [...row.querySelectorAll(':scope > div')];
  if (cells.length < 4) return;
  const [carrierName, carrierAddress] = applicationCarriers[index % applicationCarriers.length];
  const [supplyAddress, supplyDate] = applicationPickupPointsData[index % applicationPickupPointsData.length];
  const [cargoName, cargoWeight, cargoCount] = applicationCargo[index % applicationCargo.length];
  const isDraft = row.classList.contains('draft-row');
  if (isDraft) row.dataset.status = 'draft';
  const draftVariant = index % 5;
  const showCarrier = !isDraft || draftVariant < 3;
  const showSupplyPoint = !isDraft || draftVariant === 0 || draftVariant === 2;
  const showCargo = !isDraft || draftVariant === 0 || draftVariant === 1;

  fillApplicationCell(cells[1], showCarrier ? carrierName : '', showCarrier ? carrierAddress : '');
  fillApplicationCell(cells[2], showSupplyPoint ? supplyAddress : '', showSupplyPoint ? supplyDate : '');
  fillApplicationCell(cells[3], showCargo ? cargoName : '', showCargo ? cargoWeight : '');
  cells[3].classList.add('cargo');
  if (showCargo) {
    const count = document.createElement('span');
    count.className = 'muted';
    count.textContent = cargoCount;
    cells[3].append(count);
  }

  const documentNumber = cells[0].querySelector('strong')?.textContent.trim() || '';
  row.dataset.search = [
    documentNumber,
    showCarrier ? `${carrierName} ${carrierAddress}` : '',
    showSupplyPoint ? `${supplyAddress} ${supplyDate}` : '',
    showCargo ? `${cargoName} ${cargoWeight} ${cargoCount}` : '',
  ]
    .join(' ')
    .toLocaleLowerCase('ru');
});

const activeAssignmentsTable = document.querySelector('#assignmentsView .assignment-table');
const activeAssignmentRowsByStatus = ['assignment-signature', 'assignment-carrier', 'assignment-error']
  .map((status) => ({
    status,
    rows: [...document.querySelectorAll(`#assignmentsView .assignment-row[data-status="${status}"], #counterpartyAssignmentsView .assignment-row[data-status="${status}"]`)],
  }));
const mixedActiveAssignmentRows = [];
let previousActiveAssignmentStatus = '';
while (activeAssignmentRowsByStatus.some((group) => group.rows.length)) {
  const availableGroups = activeAssignmentRowsByStatus
    .filter((group) => group.rows.length)
    .sort((first, second) => second.rows.length - first.rows.length);
  const nextGroup = availableGroups.find((group) => group.status !== previousActiveAssignmentStatus) || availableGroups[0];
  mixedActiveAssignmentRows.push(nextGroup.rows.shift());
  previousActiveAssignmentStatus = nextGroup.status;
}
mixedActiveAssignmentRows.forEach((row) => activeAssignmentsTable.append(row));

const allAssignmentSupplementalRows = [
  ...document.querySelectorAll('#draftAssignmentsView .draft-assignment-row'),
  ...document.querySelectorAll('#archiveAssignmentsView .archive-assignment-row[data-archive-section="completed"]'),
].map((sourceRow) => {
  const row = sourceRow.cloneNode(true);
  row.classList.remove('draft-assignment-row', 'archive-assignment-row');
  row.classList.add('all-assignment-row');
  activeAssignmentsTable.append(row);
  return row;
});

const allAssignmentRowsByStatus = [...activeAssignmentsTable.querySelectorAll('.assignment-row')]
  .reduce((groups, row) => {
    const status = row.dataset.status || 'other';
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(row);
    return groups;
  }, new Map());
const mixedAllAssignmentRows = [];
let previousAllAssignmentStatus = '';
while ([...allAssignmentRowsByStatus.values()].some((group) => group.length)) {
  const availableGroups = [...allAssignmentRowsByStatus.entries()]
    .filter(([, group]) => group.length)
    .sort((first, second) => second[1].length - first[1].length);
  const nextGroup = availableGroups.find(([status]) => status !== previousAllAssignmentStatus) || availableGroups[0];
  mixedAllAssignmentRows.push(nextGroup[1].shift());
  previousAllAssignmentStatus = nextGroup[0];
}
mixedAllAssignmentRows.forEach((row) => activeAssignmentsTable.append(row));

const archiveRowsContainer = document.querySelector('#archiveRows');
const trashRowSources = [
  document.querySelector('#draftRows .table-row:nth-child(2)'),
  document.querySelector('#rows .table-row:nth-child(1)'),
  document.querySelector('#counterpartyRows .table-row:nth-child(3)'),
  archiveRowsContainer.querySelector('[data-archive-section="completed"]'),
  archiveRowsContainer.querySelector('[data-archive-section="rejected"]'),
];

trashRowSources.forEach((sourceRow) => {
  const trashRow = sourceRow.cloneNode(true);
  trashRow.dataset.archiveSection = 'trash';
  if (sourceRow.closest('#draftRows')) trashRow.dataset.status = 'draft';
  trashRow.hidden = false;
  trashRow.querySelectorAll('.progress-tooltip').forEach((tooltip) => {
    const segment = tooltip.parentElement;
    if (!segment.dataset.tooltip) segment.dataset.tooltip = tooltip.textContent.trim();
    segment.removeAttribute('aria-describedby');
    tooltip.remove();
  });
  archiveRowsContainer.append(trashRow);
});

const archiveApplicationRowsContainer = document.querySelector('#archiveApplicationRows');
const archiveAllDraftApplications = [...document.querySelectorAll('#draftApplicationRows .table-row')]
  .slice(0, 3)
  .map((sourceRow) => {
    const draftRow = sourceRow.cloneNode(true);
    draftRow.dataset.archiveSection = 'all';
    draftRow.dataset.status = 'draft';
    draftRow.hidden = false;
    archiveApplicationRowsContainer.append(draftRow);
    return draftRow;
  });
const completedArchiveApplications = [...archiveApplicationRowsContainer.querySelectorAll('[data-archive-section="completed"]')];
const rejectedArchiveApplications = [...archiveApplicationRowsContainer.querySelectorAll('[data-archive-section="rejected"]')];
const mixedArchiveApplications = [];
while (completedArchiveApplications.length || archiveAllDraftApplications.length || rejectedArchiveApplications.length) {
  if (completedArchiveApplications.length) mixedArchiveApplications.push(completedArchiveApplications.shift());
  if (archiveAllDraftApplications.length) mixedArchiveApplications.push(archiveAllDraftApplications.shift());
  if (rejectedArchiveApplications.length) mixedArchiveApplications.push(rejectedArchiveApplications.shift());
}
mixedArchiveApplications.forEach((row) => archiveApplicationRowsContainer.append(row));

const trashApplicationSources = [
  document.querySelector('#draftApplicationRows .table-row:nth-child(1)'),
  document.querySelector('#applicationRows .table-row:nth-child(1)'),
  document.querySelector('#applicationRows [data-status="error"]'),
  document.querySelector('#counterpartyApplicationRows .table-row:nth-child(1)'),
  archiveApplicationRowsContainer.querySelector('[data-archive-section="completed"]'),
  archiveApplicationRowsContainer.querySelector('[data-archive-section="rejected"]'),
];

trashApplicationSources.forEach((sourceRow) => {
  const trashApplication = sourceRow.cloneNode(true);
  trashApplication.dataset.archiveSection = 'trash';
  if (sourceRow.closest('#draftApplicationRows')) trashApplication.dataset.status = 'draft';
  trashApplication.hidden = false;
  archiveApplicationRowsContainer.append(trashApplication);
});

const allApplicationsContainer = document.querySelector('#applicationRows');
const allApplicationSupplementalRows = [
  ...document.querySelectorAll('#counterpartyApplicationRows .table-row'),
  ...document.querySelectorAll('#draftApplicationRows .table-row'),
  ...archiveApplicationRowsContainer.querySelectorAll('.table-row[data-archive-section="completed"], .table-row[data-archive-section="rejected"]'),
].map((sourceRow) => {
  const row = sourceRow.cloneNode(true);
  row.classList.add('all-application-row');
  allApplicationsContainer.append(row);
  return row;
});

const allApplicationRowsByStatus = [...allApplicationsContainer.querySelectorAll('.table-row')]
  .reduce((groups, row) => {
    const status = row.dataset.status || 'other';
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(row);
    return groups;
  }, new Map());
const mixedAllApplicationRows = [];
let previousAllApplicationStatus = '';
while ([...allApplicationRowsByStatus.values()].some((group) => group.length)) {
  const availableGroups = [...allApplicationRowsByStatus.entries()]
    .filter(([, group]) => group.length)
    .sort((first, second) => second[1].length - first[1].length);
  const nextGroup = availableGroups.find(([status]) => status !== previousAllApplicationStatus) || availableGroups[0];
  mixedAllApplicationRows.push(nextGroup[1].shift());
  previousAllApplicationStatus = nextGroup[0];
}
mixedAllApplicationRows.forEach((row) => allApplicationsContainer.append(row));

const rejectedInvoiceRows = [...archiveRowsContainer.querySelectorAll('[data-archive-section="rejected"]')];
const supplementalRejectedNumbers = [
  ['TN/202407-884', 'от 02.08'],
  ['TN/202407-893', 'от 02.08'],
];
while (rejectedInvoiceRows.length && rejectedInvoiceRows.length < 7) {
  const extraRejectedRow = rejectedInvoiceRows[0].cloneNode(true);
  const [number, date] = supplementalRejectedNumbers[rejectedInvoiceRows.length - 5] || [`TN/202407-${884 + rejectedInvoiceRows.length}`, 'от 02.08'];
  extraRejectedRow.querySelector('.invoice-cell strong').textContent = number;
  extraRejectedRow.querySelector('.invoice-cell .muted').textContent = date;
  extraRejectedRow.dataset.search = `${extraRejectedRow.dataset.search || ''} ${number}`.toLocaleLowerCase('ru');
  archiveRowsContainer.append(extraRejectedRow);
  rejectedInvoiceRows.push(extraRejectedRow);
}

const rejectedInvoiceTypes = [
  {
    tag: 'Т2',
    label: 'Отказано в подписи перевозчиком',
    status: 'carrier-rejection',
    aria: 'Т2: отказано в подписи перевозчиком',
    segments: [
      ['solid-step', 'Накладная подписана грузоотправителем 31 июля 10:26 (UTC +03:00)'],
      ['error-step', 'Отказано в подписи перевозчиком на погрузке 5 августа 11:54 (UTC +03:00)'],
      ['empty'], ['empty'],
    ],
  },
  {
    tag: 'Т3',
    label: 'Отказано грузополучателем',
    status: 'carrier-rejection',
    aria: 'Т3: отказано грузополучателем',
    segments: [
      ['solid-step', 'Накладная подписана грузоотправителем 31 июля 10:26 (UTC +03:00)'],
      ['solid-step', 'Накладная подписана перевозчиком на погрузке 4 августа 18:08 (UTC +03:00)'],
      ['error-step', 'Получатель отказал в приемке груза 4 августа 18:17 (UTC +03:00)'],
      ['empty'],
    ],
  },
  {
    tag: 'Т3',
    label: 'Груз принят частично',
    status: 'carrier-rejection',
    aria: 'Т3: груз принят частично',
    segments: [
      ['solid-step', 'Накладная подписана грузоотправителем 31 июля 10:26 (UTC +03:00)'],
      ['solid-step', 'Накладная подписана перевозчиком на погрузке 4 августа 18:08 (UTC +03:00)'],
      ['warning-step', 'Получатель принял груз частично 22 августа 16:33 (UTC +03:00)'],
      ['empty'],
    ],
  },
  {
    tag: 'Т4',
    label: 'Требуется переадресовка',
    status: 'carrier-rejection',
    aria: 'Т4: требуется переадресовка',
    segments: [
      ['solid-step', 'Накладная подписана грузоотправителем 31 июля 10:26 (UTC +03:00)'],
      ['solid-step', 'Накладная подписана перевозчиком на погрузке 4 августа 18:08 (UTC +03:00)'],
      ['warning-step', 'Получатель принял груз частично 22 августа 16:33 (UTC +03:00)'],
      ['solid-step', 'Накладная подписана перевозчиком на сдаче 23 августа 10:48 (UTC +03:00)'],
    ],
  },
  {
    tag: 'Т7',
    label: 'Переадресовка',
    status: 'carrier-rejection',
    aria: 'Т7: переадресовка',
    five: true,
    segments: [
      ['solid-step', 'Накладная подписана грузоотправителем 31 июля 10:26 (UTC +03:00)'],
      ['solid-step', 'Накладная подписана перевозчиком на погрузке 4 августа 18:08 (UTC +03:00)'],
      ['solid-step', 'Перевозчик подписал титул переадресовки 22 августа 16:43 (UTC +03:00)'],
      ['warning-step', 'Получатель принял груз частично 22 августа 16:33 (UTC +03:00)'],
      ['solid-step', 'Накладная подписана перевозчиком на сдаче 23 августа 10:48 (UTC +03:00)'],
    ],
  },
  {
    tag: 'Т4',
    label: 'Ожидает подписи водителя',
    status: 'carrier-rejection',
    aria: 'Т4: ожидает подписи водителя',
    five: true,
    segments: [
      ['solid-step', 'Накладная подписана грузоотправителем 31 июля 10:26 (UTC +03:00)'],
      ['solid-step', 'Накладная подписана перевозчиком на погрузке 4 августа 18:08 (UTC +03:00)'],
      ['solid-step', 'Перевозчик подписал титул переадресовки 23 августа 10:53 (UTC +03:00)'],
      ['warning-step', 'Получатель принял груз полностью 22 августа 10:58 (UTC +03:00)\nПолучатель принял груз частично 23 августа 10:44 (UTC +03:00)', '2'],
      ['solid-step', 'Накладная подписана перевозчиком на сдаче 23 августа 10:48 (UTC +03:00)'],
    ],
  },
  {
    tag: 'Т6',
    label: 'Отказано в подписи грузоотправителем',
    status: 'transport-cost',
    aria: 'Т6: отказано в подписи грузоотправителем',
    second: true,
    segments: [
      ['solid-step', 'Титул стоимости подписан перевозчиком 4 августа 20:18 (UTC +03:00)'],
      ['error-step', 'Отказано в подписи грузоотправителем 23 июля 16:30 (UTC +03:00).'],
    ],
  },
];

function createProgressSegment([type, tooltip, count]) {
  if (type === 'empty') return document.createElement('i');
  const segment = document.createElement('button');
  segment.className = type;
  segment.type = 'button';
  segment.dataset.tooltip = tooltip;
  if (count) {
    const countLabel = document.createElement('span');
    countLabel.className = 'segment-count';
    countLabel.textContent = count;
    segment.append(countLabel);
  }
  return segment;
}

rejectedInvoiceRows.slice(0, rejectedInvoiceTypes.length).forEach((row, index) => {
  const type = rejectedInvoiceTypes[index];
  row.dataset.status = type.status;
  const invoiceCell = row.querySelector('.invoice-cell');
  invoiceCell.querySelector('.invoice-row-status')?.remove();
  const status = document.createElement('span');
  status.className = 'invoice-row-status';
  const tag = document.createElement('span');
  tag.textContent = type.tag;
  status.append(tag, document.createTextNode(type.label));
  const progress = invoiceCell.querySelector('.progress');
  progress.className = `progress${type.six ? ' six-step' : ''}${type.five ? ' five-step' : ''}${type.second ? ' second' : ''}`;
  progress.setAttribute('aria-label', type.aria);
  progress.replaceChildren(...type.segments.map(createProgressSegment));
  invoiceCell.insertBefore(status, progress);
});

const additionalRejectedInvoices = [
  ['TN/202407-918', 'от 03.08', 'ООО «СеверКарго»', '+7 812 604-18-52', 'Р418МС198', 'АО «Полярный Комплект»', 'Россия, 183038, Мурманская область, г. Мурманск, Промышленная улица, дом 21', 'Кабельные муфты', '1 860 кг', '74 шт'],
  ['TN/202407-927', 'от 03.08', 'АО «Волга Транзит»', '+7 843 221-09-64', 'К729РТ116', 'ООО «КазаньТехСнаб»', 'Россия, 420054, Республика Татарстан, г. Казань, Техническая улица, дом 18', 'Комплектующие для станков', '3 240 кг', '58 шт'],
  ['TN/202407-936', 'от 04.08', 'ООО «СибМедЛогистика»', '+7 383 214-67-30', 'М936ОА154', 'АО «Диагностик Сибирь»', 'Россия, 630052, Новосибирская область, г. Новосибирск, Толмачёвская улица, дом 58', 'Медицинские реагенты', '820 кг', '196 шт'],
  ['TN/202407-945', 'от 04.08', 'АО «ЮгТрансСервис»', '+7 861 238-42-15', 'В945ХС123', 'ООО «Кубань Агро»', 'Россия, 350072, Краснодарский край, г. Краснодар, Ростовское шоссе, дом 29', 'Оборудование для орошения', '6 480 кг', '24 шт'],
  ['TN/202407-954', 'от 05.08', 'ООО «УралПромТранс»', '+7 343 276-31-48', 'Н954ВК196', 'АО «ЭнергоСистемы»', 'Россия, 620024, Свердловская область, г. Екатеринбург, Елизаветинское шоссе, дом 54', 'Электротехнические шкафы', '4 720 кг', '16 шт'],
  ['TN/202407-963', 'от 05.08', 'АО «Донская Магистраль»', '+7 863 241-73-06', 'Е963МН161', 'ООО «РостовКомплект»', 'Россия, 344065, Ростовская область, г. Ростов-на-Дону, Орская улица, дом 45', 'Упаковочная плёнка', '2 130 кг', '340 шт'],
];

additionalRejectedInvoices.forEach((data, index) => {
  const [number, date, sender, phone, vehicle, recipient, address, cargo, weight, count] = data;
  const row = rejectedInvoiceRows[index].cloneNode(true);
  const cells = [...row.querySelectorAll(':scope > div')];
  cells[0].querySelector('strong').textContent = number;
  cells[0].querySelector('.muted').textContent = date;
  cells[1].querySelector('strong').textContent = sender;
  cells[1].querySelector('.muted').replaceChildren(phone, document.createElement('br'), vehicle);
  cells[2].querySelector('strong').textContent = recipient;
  cells[2].querySelector('.muted').textContent = address;
  cells[3].querySelector('strong').textContent = cargo;
  const cargoValues = cells[3].querySelectorAll('span');
  cargoValues[0].textContent = weight;
  cargoValues[1].textContent = count;
  row.dataset.search = `${number} ${sender} ${phone} ${vehicle} ${recipient} ${address} ${cargo} ${weight} ${count}`.toLocaleLowerCase('ru');
  archiveRowsContainer.append(row);
});

const completedInvoiceTypes = {
  delivery: {
    tag: 'Т4',
    label: 'Документооборот завершен',
    aria: 'Т4: документооборот завершен',
    segments: [
      ['solid-step', 'Накладная подписана грузоотправителем 31 июля 10:26 (UTC +03:00)'],
      ['solid-step', 'Накладная подписана перевозчиком на погрузке 4 августа 18:08 (UTC +03:00)'],
      ['solid-step', 'Получатель принял груз полностью 4 августа 18:11 (UTC +03:00)'],
      ['solid-step', 'Накладная подписана перевозчиком на сдаче 5 августа 12:04 (UTC +03:00)'],
    ],
  },
  'transport-cost': {
    tag: 'Т6',
    label: 'Документооборот завершен',
    aria: 'Т6: документооборот завершен',
    second: true,
    segments: [
      ['solid-step', 'Титул стоимости подписан перевозчиком 4 августа 20:18 (UTC +03:00)'],
      ['solid-step', 'Титул стоимости подписан грузоотправителем 4 августа 20:18 (UTC +03:00)'],
    ],
  },
  'multi-delivery': {
    tag: 'Т4',
    label: 'Документооборот завершен',
    aria: 'Т4: документооборот завершен, несколько операций',
    five: true,
    segments: [
      ['solid-step', 'Накладная подписана грузоотправителем 21 августа 16:26 (UTC +03:00)'],
      ['solid-step', 'Накладная подписана перевозчиком на погрузке 22 августа 09:14 (UTC +03:00)'],
      ['solid-step', 'Перевозчик подписал титул переадресовки 23 августа 10:53 (UTC +03:00)'],
      ['warning-step', 'Получатель принял груз полностью 22 августа 10:58 (UTC +03:00)\nПолучатель принял груз частично 23 августа 10:44 (UTC +03:00)', '2'],
      ['solid-step', 'Накладная подписана перевозчиком на сдаче 22 августа 11:00 (UTC +03:00)\nНакладная подписана перевозчиком на сдаче 23 августа 10:48 (UTC +03:00)', '2'],
    ],
  },
};

const completedDeliveryRows = [...archiveRowsContainer.querySelectorAll('[data-archive-section="completed"][data-status="delivery"]')];
[completedDeliveryRows[1], completedDeliveryRows[3]].filter(Boolean).forEach((row) => {
  row.dataset.archiveType = 'multi-delivery';
});

archiveRowsContainer.querySelectorAll('[data-archive-section="completed"]').forEach((row) => {
  const type = completedInvoiceTypes[row.dataset.archiveType || row.dataset.status];
  if (!type) return;
  const invoiceCell = row.querySelector('.invoice-cell');
  invoiceCell.querySelector('.invoice-row-status')?.remove();
  const status = document.createElement('span');
  status.className = 'invoice-row-status';
  const tag = document.createElement('span');
  tag.textContent = type.tag;
  status.append(tag, document.createTextNode(type.label));
  const progress = invoiceCell.querySelector('.progress');
  progress.className = `progress${type.second ? ' second' : ''}${type.five ? ' five-step' : ''}`;
  progress.setAttribute('aria-label', type.aria);
  progress.replaceChildren(...type.segments.map(createProgressSegment));
  invoiceCell.insertBefore(status, progress);
});

const rejectedArchiveRows = [...archiveRowsContainer.querySelectorAll('[data-archive-section="rejected"]')];
const rejectedByCarrier = rejectedArchiveRows.filter((row) => row.dataset.status === 'carrier-rejection');
const rejectedByCost = rejectedArchiveRows.filter((row) => row.dataset.status === 'transport-cost');
const mixedRejectedRows = [];
while (rejectedByCarrier.length || rejectedByCost.length) {
  if (rejectedByCarrier.length) mixedRejectedRows.push(rejectedByCarrier.shift());
  if (rejectedByCost.length) mixedRejectedRows.push(rejectedByCost.shift());
}
mixedRejectedRows.forEach((row) => archiveRowsContainer.append(row));

const finalArchiveRowsByStatus = ['delivery', 'carrier-rejection', 'transport-cost']
  .map((status) => [...archiveRowsContainer.querySelectorAll(`[data-archive-section="completed"][data-status="${status}"], [data-archive-section="rejected"][data-status="${status}"]`)]);
const mixedFinalArchiveRows = [];
while (finalArchiveRowsByStatus.some((statusRows) => statusRows.length)) {
  finalArchiveRowsByStatus.forEach((statusRows) => {
    if (statusRows.length) mixedFinalArchiveRows.push(statusRows.shift());
  });
}
mixedFinalArchiveRows.forEach((row) => archiveRowsContainer.append(row));

const currentTrashInvoiceTypes = {
  delivery: completedInvoiceTypes.delivery,
  'transport-cost': completedInvoiceTypes['transport-cost'],
  'carrier-rejection': rejectedInvoiceTypes[0],
};

archiveRowsContainer.querySelectorAll('[data-archive-section="trash"]').forEach((row) => {
  const invoiceCell = row.querySelector('.invoice-cell');
  if (invoiceCell.querySelector('.invoice-row-status, .draft-label')) return;
  const type = currentTrashInvoiceTypes[row.dataset.status];
  if (!type) return;

  const status = document.createElement('span');
  status.className = 'invoice-row-status';
  const tag = document.createElement('span');
  tag.textContent = type.tag;
  status.append(tag, document.createTextNode(type.label));

  const progress = invoiceCell.querySelector('.progress');
  progress.className = `progress${type.second ? ' second' : ''}${type.five ? ' five-step' : ''}${type.six ? ' six-step' : ''}`;
  progress.setAttribute('aria-label', type.aria);
  progress.replaceChildren(...type.segments.map(createProgressSegment));
  invoiceCell.insertBefore(status, progress);
});

document.querySelectorAll('#archiveRows .progress').forEach((progress) => {
  const row = progress.closest('.table-row');
  const previousStageTooltips = archiveSegmentTooltips[row.dataset.status] || [];
  [...progress.children].forEach((segment, segmentIndex) => {
    if (!segment.classList.contains('solid-segment')) return;
    const interactiveSegment = document.createElement('button');
    interactiveSegment.className = 'solid-step';
    interactiveSegment.type = 'button';
    interactiveSegment.dataset.tooltip = previousStageTooltips[segmentIndex] || 'Этап документа завершен';
    segment.replaceWith(interactiveSegment);
  });
});

document.querySelectorAll('.progress [data-tooltip]').forEach((segment, index) => {
  const tooltip = document.createElement('span');
  const tooltipId = `generated-progress-tooltip-${index + 1}`;
  tooltip.className = 'progress-tooltip t-body-s';
  tooltip.id = tooltipId;
  tooltip.setAttribute('role', 'tooltip');
  let tooltipText = segment.dataset.tooltip;
  if (segment.closest('[data-status="waiting"]') && !segment.closest('#applicationRows') && !tooltipText.endsWith('Ожидает подпись отправителя')) {
    tooltipText += ' Ожидает подпись отправителя';
  }
  const archiveSection = segment.closest('[data-archive-section]')?.dataset.archiveSection;
  const isFinalArchiveDocument = archiveSection === 'completed' || archiveSection === 'rejected';
  if (!isFinalArchiveDocument && !segment.closest('#counterpartyApplicationRows') && tooltipText.startsWith('Заказ-заявка подписана грузоотправителем') && !tooltipText.endsWith('Ожидает подпись перевозчика')) {
    tooltipText += ' Ожидает подпись перевозчика';
  }
  const waitingMatch = tooltipText.match(/^(.*) (Ожида(?:ет|ется) подпись (?:водителя|перевозчика|отправителя|экспедитора))$/);
  const tooltipLines = waitingMatch ? [waitingMatch[1], waitingMatch[2]] : tooltipText.split('\n');
  tooltipLines.forEach((line, lineIndex) => {
    if (lineIndex) tooltip.append(document.createElement('br'));
    tooltip.append(document.createTextNode(line));
  });

  const pointer = document.createElement('img');
  pointer.src = './assets/icons/tooltip-pointer.svg';
  pointer.alt = '';
  tooltip.append(pointer);
  segment.setAttribute('aria-describedby', tooltipId);
  segment.append(tooltip);
});

const rows = [...document.querySelectorAll('.table-row')];
const assignmentRows = [...document.querySelectorAll('.assignment-row')];
const counterpartyAssignmentRows = [...document.querySelectorAll('.counterparty-assignment-row')];
const requiresAssignmentRows = [...document.querySelectorAll('#assignmentsView .assignment-row:not(.counterparty-assignment-row):not(.all-assignment-row)')];
const archiveAssignmentRows = [...document.querySelectorAll('.archive-assignment-row')];
const draftAssignmentRows = [...document.querySelectorAll('.draft-assignment-row')];
const trashAssignmentRows = archiveAssignmentRows.filter((row) => row.dataset.archiveSection === 'trash');
const shipperAssignmentRows = [
  ...requiresAssignmentRows,
  ...trashAssignmentRows.filter((row) => ['assignment-signature', 'assignment-error'].includes(row.dataset.status)),
];
const forwarderAssignmentRows = [
  ...counterpartyAssignmentRows,
  ...trashAssignmentRows.filter((row) => row.dataset.status === 'assignment-carrier'),
];
const currentDraftAssignmentRows = [
  ...draftAssignmentRows,
  ...trashAssignmentRows.filter((row) => row.dataset.status === 'assignment-draft'),
];

currentDraftAssignmentRows.forEach((row) => {
  row.querySelector('.draft-label')?.classList.replace('draft-label', 'invoice-row-status');
});

function replaceAssignmentTooltip(segment, text) {
  segment.dataset.tooltip = text;
  const tooltip = segment.querySelector('.progress-tooltip');
  if (!tooltip) return;
  const pointer = tooltip.querySelector('img');
  tooltip.replaceChildren(document.createTextNode(text));
  if (pointer) tooltip.append(pointer);
}

shipperAssignmentRows.forEach((row) => {
  const invoiceCell = row.querySelector('.invoice-cell');
  const progress = invoiceCell.querySelector('.assignment-progress');
  const segment = progress?.querySelector('button');
  if (!progress || !segment) return;

  const isError = row.dataset.status === 'assignment-error';
  const statusText = isError
    ? 'Ошибка подписи грузоотправителя'
    : 'Требует подписи грузоотправителя';
  const status = document.createElement('span');
  status.className = 'invoice-row-status';
  status.textContent = statusText;
  progress.before(status);
  progress.setAttribute('aria-label', statusText);

  const tooltipText = segment.dataset.tooltip || '';
  replaceAssignmentTooltip(
    segment,
    isError
      ? tooltipText
      : tooltipText.replace(/\s+Ожидает подпись отправителя$/, ''),
  );
});

forwarderAssignmentRows.forEach((row) => {
  const invoiceCell = row.querySelector('.invoice-cell');
  const progress = invoiceCell.querySelector('.assignment-progress');
  const segment = progress?.querySelector('button');
  if (!progress || !segment) return;

  const statusText = 'Требует подписи экспедитора';
  const status = document.createElement('span');
  status.className = 'invoice-row-status';
  status.textContent = statusText;
  progress.before(status);
  progress.setAttribute('aria-label', statusText);

  replaceAssignmentTooltip(
    segment,
    (segment.dataset.tooltip || '').replace(/\s+Требует подписи экспедитора$/, ''),
  );
});

archiveAssignmentRows
  .filter((row) => row.dataset.status === 'assignment-completed')
  .forEach((row) => {
    const invoiceCell = row.querySelector('.invoice-cell');
    const progress = invoiceCell.querySelector('.assignment-progress');
    if (!progress) return;

    const statusText = 'Документооборот завершен';
    const status = document.createElement('span');
    status.className = 'invoice-row-status';
    status.textContent = statusText;
    progress.before(status);
    progress.setAttribute('aria-label', statusText);
  });
const organizationStatuses = ['observer-signer', 'observer', 'signer'];
const assignmentShippers = [
  'ООО «Невская Производственная Компания»',
  'АО «Северный терминал»',
  'ООО «Уральский промышленный комплекс»',
  'АО «Московский пищевой комбинат»',
  'ООО «Волга Снаб»',
  'АО «ДонАгро»',
  'ООО «Сибирская торговая компания»',
  'АО «Восточный складской комплекс»',
];
assignmentRows.forEach((row, index) => {
  const invoice = row.querySelector('.invoice-cell');
  const forwarder = invoice.nextElementSibling?.querySelector('strong')?.textContent.trim() || '';
  const route = invoice.nextElementSibling?.nextElementSibling?.querySelector('strong')?.textContent.trim() || '';
  row.dataset.forwarder = forwarder;
  row.dataset.shipper = assignmentShippers[index % assignmentShippers.length];
  row.dataset.loadingAddress = route.split(' — ')[0].trim();
});
rows.forEach((row, index) => {
  row.dataset.orgStatus = organizationStatuses[index % organizationStatuses.length];
  if (row.closest('#applicationRows, #counterpartyApplicationRows, #draftApplicationRows, #archiveApplicationRows')) {
    row.dataset.carrier = row.querySelector('.invoice-cell').nextElementSibling.querySelector('strong')?.textContent.trim() || '';
    row.dataset.supplyPoint = row.querySelector('.invoice-cell').nextElementSibling?.nextElementSibling?.querySelector('strong')?.textContent.trim() || '';
  }
  const invoiceName = row.querySelector('.invoice-cell strong').textContent;
  const documentName = row.classList.contains('assignment-row')
    ? 'поручение'
    : row.closest('#applicationRows, #counterpartyApplicationRows, #draftApplicationRows, #archiveApplicationRows') ? 'заявку' : 'накладную';
  const checkLabel = document.createElement('label');
  checkLabel.className = 'row-check';

  const checkbox = document.createElement('input');
  checkbox.className = 'row-checkbox';
  checkbox.type = 'checkbox';
  checkbox.setAttribute('aria-label', `Выбрать ${documentName} ${invoiceName}`);
  checkLabel.append(checkbox);
  row.prepend(checkLabel);

  const actionsButton = document.createElement('button');
  actionsButton.className = 'row-actions';
  actionsButton.type = 'button';
  actionsButton.setAttribute('aria-label', `Действия: ${documentName} ${invoiceName}`);
  row.append(actionsButton);
});

const rowGroups = {
  requires: document.querySelector('#rows'),
  counterparty: document.querySelector('#counterpartyRows'),
  drafts: document.querySelector('#draftRows'),
  archive: document.querySelector('#archiveRows'),
};
const applicationRows = document.querySelector('#applicationRows');
const counterpartyApplicationRows = document.querySelector('#counterpartyApplicationRows');
const draftApplicationRows = document.querySelector('#draftApplicationRows');
const applicationRowGroups = {
  requires: applicationRows,
  counterparty: counterpartyApplicationRows,
  drafts: draftApplicationRows,
  archive: document.querySelector('#archiveApplicationRows'),
};
const invoiceTableHead = document.querySelector('#invoiceTableHead');
const applicationTableHead = document.querySelector('#applicationTableHead');
const tableWrap = document.querySelector('.table-wrap');
const assignmentsView = document.querySelector('#assignmentsView');
const counterpartyAssignmentsView = document.querySelector('#counterpartyAssignmentsView');
const draftAssignmentsView = document.querySelector('#draftAssignmentsView');
const archiveAssignmentsView = document.querySelector('#archiveAssignmentsView');
const assignmentsEmpty = document.querySelector('#assignmentsEmpty');
const assignmentsNoResults = document.querySelector('#assignmentsNoResults');
const counterpartyAssignmentsNoResults = document.querySelector('#counterpartyAssignmentsNoResults');
const draftAssignmentsNoResults = document.querySelector('#draftAssignmentsNoResults');
const archiveAssignmentsNoResults = document.querySelector('#archiveAssignmentsNoResults');
const search = document.querySelector('#search');
const searchClear = document.querySelector('#searchClear');
const invoiceStatusFilter = document.querySelector('#invoiceStatusFilter');
const invoiceStatusTrigger = document.querySelector('#invoiceStatusTrigger');
const invoiceStatusLabel = document.querySelector('#invoiceStatusLabel');
const invoiceStatusDropdown = document.querySelector('#invoiceStatusDropdown');
const invoiceStatusOptions = [...invoiceStatusDropdown.querySelectorAll('[role="option"]')];
const toolbar = document.querySelector('.toolbar');
const topStatusControl = document.querySelector('.top-status-control');
const filterButton = document.querySelector('#filterButton');
const filterPanel = document.querySelector('#filterPanel');
const senderFilter = document.querySelector('#senderFilter');
const recipientFilter = document.querySelector('#recipientFilter');
const customerFilter = document.querySelector('#customerFilter');
const carrierFilter = document.querySelector('#carrierFilter');
const applicationCarrierFilter = document.querySelector('#applicationCarrierFilter');
const applicationSupplyPointFilter = document.querySelector('#applicationSupplyPointFilter');
const loadingAddressFilter = document.querySelector('#loadingAddressFilter');
const unloadingAddressFilter = document.querySelector('#unloadingAddressFilter');
const dateFromFilter = document.querySelector('#dateFromFilter');
const dateToFilter = document.querySelector('#dateToFilter');
const statusFilter = document.querySelector('#statusFilter');
const applyFilters = document.querySelector('#applyFilters');
const resetFilters = document.querySelector('#resetFilters');
const assignmentFilterFields = document.querySelector('#assignmentFilterFields');
const standardFilterBottom = document.querySelector('#standardFilterBottom');
const assignmentForwarderFilter = document.querySelector('#assignmentForwarderFilter');
const assignmentShipperFilter = document.querySelector('#assignmentShipperFilter');
const assignmentLoadingAddressFilter = document.querySelector('#assignmentLoadingAddressFilter');
const assignmentDateFromFilter = document.querySelector('#assignmentDateFromFilter');
const assignmentDateToFilter = document.querySelector('#assignmentDateToFilter');
const assignmentStatusFilter = document.querySelector('#assignmentStatusFilter');
const assignmentTopStatusFilter = document.querySelector('#assignmentTopStatusFilter');
const applyAssignmentFilters = document.querySelector('#applyAssignmentFilters');
const resetAssignmentFilters = document.querySelector('#resetAssignmentFilters');
const advancedFilterControls = [invoiceStatusFilter, senderFilter, recipientFilter, customerFilter, carrierFilter, applicationCarrierFilter, applicationSupplyPointFilter, loadingAddressFilter, unloadingAddressFilter, dateFromFilter, dateToFilter, statusFilter, assignmentForwarderFilter, assignmentShipperFilter, assignmentLoadingAddressFilter, assignmentDateFromFilter, assignmentDateToFilter, assignmentStatusFilter, assignmentTopStatusFilter];
const enhancedFilterSelects = new Map();
const searchableFilterSelects = new Set([senderFilter, recipientFilter, customerFilter, carrierFilter, applicationCarrierFilter, assignmentForwarderFilter, assignmentShipperFilter]);
const emptyState = document.querySelector('#emptyState');
const pageTitle = document.querySelector('#pageTitle');
const sectionButtons = [...document.querySelectorAll('[data-view]')];
const documentsInProgressNav = document.querySelector('#documentsInProgressNav');
const documentSubnavButtons = [document.querySelector('#workingAllNav'), document.querySelector('#requiresActionsNav'), document.querySelector('#counterpartyNav')];
const archiveNav = document.querySelector('#archiveNav');
const archiveSubnavButtons = [
  document.querySelector('#archiveAllNav'),
  document.querySelector('#archiveCompletedNav'),
  document.querySelector('#archiveRejectedNav'),
];
const statusTabsContainer = document.querySelector('.status-tabs');
const documentTypeTabs = document.querySelector('.document-type-tabs');
const statusTabs = [...statusTabsContainer.querySelectorAll('[data-status-view]')];
const invoicePartyChips = document.querySelector('#invoicePartyChips');
const invoicePartyChipButtons = [...invoicePartyChips.querySelectorAll('[data-invoice-chip]')];
const applicationPartyChips = document.querySelector('#applicationPartyChips');
const applicationPartyChipButtons = [...applicationPartyChips.querySelectorAll('[data-application-chip]')];
const assignmentPartyChips = document.querySelector('#assignmentPartyChips');
const assignmentPartyChipButtons = [...assignmentPartyChips.querySelectorAll('[data-assignment-chip]')];
const documentMenuItems = [...document.querySelectorAll('[data-document-menu]')];
const archiveMenuItem = document.querySelector('#archiveMenuItem');
const applicationTab = document.querySelector('.tabs [data-tab="Заявки"]');
const assignmentsTab = document.querySelector('.tabs [data-tab="Поручения"]');
const receiptsTab = document.querySelector('#receiptsTab');
const invoicesTab = document.querySelector('.tabs [data-tab="Накладные"]');
const receiptsView = document.querySelector('#receiptsView');
const receiptDetailView = document.querySelector('#receiptDetailView');
const receiptDetailNumber = document.querySelector('#receiptDetailNumber');
const receiptDetailBack = document.querySelector('#receiptDetailBack');
const receiptDetailOrder = document.querySelector('#receiptDetailOrder');
const assignmentDetailView = document.querySelector('#assignmentDetailView');
const applicationDetailView = document.querySelector('#applicationDetailView');
const applicationDetailBack = document.querySelector('#applicationDetailBack');
const applicationDetailListBack = document.querySelector('#applicationDetailListBack');
const applicationDetailNumber = document.querySelector('#applicationDetailNumber');
const applicationInfoNumber = document.querySelector('#applicationInfoNumber');
const applicationInfoDate = document.querySelector('#applicationInfoDate');
const applicationCarrierName = document.querySelector('#applicationCarrierName');
const applicationDetailStatus = document.querySelector('#applicationDetailStatus');
const applicationPrimaryAction = document.querySelector('#applicationPrimaryAction');
const applicationEditAction = document.querySelector('#applicationEditAction');
const applicationCompletedTabs = [...document.querySelectorAll('.application-completed-tab')];
const assignmentDetailNumber = document.querySelector('#assignmentDetailNumber');
const assignmentDetailStatus = document.querySelector('#assignmentDetailStatus');
const assignmentDetailBack = document.querySelector('#assignmentDetailBack');
const invoiceDetailView = document.querySelector('#invoiceDetailView');
const invoiceDetailNumber = document.querySelector('#invoiceDetailNumber');
const invoiceDetailStatus = document.querySelector('#invoiceDetailStatus');
const invoiceDetailBack = document.querySelector('#invoiceDetailBack');
const invoiceInfoNumber = document.querySelector('#invoiceInfoNumber');
const invoiceInfoDate = document.querySelector('#invoiceInfoDate');
const invoiceSenderName = document.querySelector('#invoiceSenderName');
const invoiceSenderContact = document.querySelector('#invoiceSenderContact');
const invoiceRecipientName = document.querySelector('#invoiceRecipientName');
const invoiceRecipientAddress = document.querySelector('#invoiceRecipientAddress');
const invoiceCargoName = document.querySelector('#invoiceCargoName');
const invoiceSenderSignature = document.querySelector('#invoiceSenderSignature');
const invoiceSenderIcon = document.querySelector('#invoiceSenderIcon');
const invoiceSenderSigner = document.querySelector('#invoiceSenderSigner');
const invoiceDriverName = document.querySelector('#invoiceDriverName');
const invoiceCurrentStatusText = document.querySelector('#invoiceCurrentStatusText');
const invoiceCarrierSignature = document.querySelector('#invoiceCarrierSignature');
const invoiceCarrierSigner = document.querySelector('#invoiceCarrierSigner');
const invoiceQrSignature = document.querySelector('#invoiceQrSignature');
const invoiceQrLabel = document.querySelector('#invoiceQrLabel');
const invoiceLoadingStep = document.querySelector('#invoiceLoadingStep');
const invoiceLoadingTitle = document.querySelector('#invoiceLoadingTitle');
const invoiceCreatedStep = document.querySelector('#invoiceCreatedStep');
const invoiceCarrierIcon = document.querySelector('#invoiceCarrierIcon');
const invoiceLoadingComment = document.querySelector('#invoiceLoadingComment');
const invoiceUnloadingStep = document.querySelector('#invoiceUnloadingStep');
const invoiceUnloadingToggle = document.querySelector('#invoiceUnloadingToggle');
const invoiceUnloadingTitle = document.querySelector('#invoiceUnloadingTitle');
const invoiceUnloadingChevron = document.querySelector('#invoiceUnloadingChevron');
const invoiceUnloadingSectionLink = document.querySelector('#invoiceUnloadingSectionLink');
const invoiceUnloadingSignatures = document.querySelector('#invoiceUnloadingSignatures');
const invoiceUnloadingComment = document.querySelector('#invoiceUnloadingComment');
const invoiceUnloadingRecipientSigner = document.querySelector('#invoiceUnloadingRecipientSigner');
const invoiceUnloadingDriver = document.querySelector('#invoiceUnloadingDriver');
const invoiceUnloadingDriverName = document.querySelector('#invoiceUnloadingDriverName');
const invoiceUnloadingCarrier = document.querySelector('#invoiceUnloadingCarrier');
const invoiceUnloadingCarrierSigner = document.querySelector('#invoiceUnloadingCarrierSigner');
const invoiceSecondUnloadingStep = document.querySelector('#invoiceSecondUnloadingStep');
const invoiceSecondUnloadingToggle = document.querySelector('#invoiceSecondUnloadingToggle');
const invoiceSecondUnloadingChevron = document.querySelector('#invoiceSecondUnloadingChevron');
const invoiceSecondUnloadingSignatures = document.querySelector('#invoiceSecondUnloadingSignatures');
const invoiceCostStep = document.querySelector('#invoiceCostStep');
const invoiceCostToggle = document.querySelector('#invoiceCostToggle');
const invoiceCostChevron = document.querySelector('#invoiceCostChevron');
const invoiceCostSignatures = document.querySelector('#invoiceCostSignatures');
const invoiceCostSenderSignature = document.querySelector('#invoiceCostSenderSignature');
const invoiceCostSenderIcon = document.querySelector('#invoiceCostSenderIcon');
const invoiceCostSenderSigner = document.querySelector('#invoiceCostSenderSigner');
const invoiceStatusActions = document.querySelector('#invoiceStatusActions');
const invoicePrimaryAction = document.querySelector('#invoicePrimaryAction');
const invoiceSecondaryAction = document.querySelector('#invoiceSecondaryAction');
const invoiceTertiaryAction = document.querySelector('#invoiceTertiaryAction');
const invoiceStatusInfo = document.querySelector('#invoiceStatusInfo');
const invoiceCostDetails = document.querySelector('#invoiceCostDetails');
const invoiceCompleteStep = document.querySelector('#invoiceCompleteStep');
const helpButton = document.querySelector('#helpButton');
const helpPopover = document.querySelector('#helpPopover');
const toast = document.querySelector('#toast');
let activeView = 'invoice-all';
let activeDocumentTab = 'invoices';
let archiveMenuMode = false;
let activeInvoiceChip = 'all';
let activeApplicationChip = 'all';
let activeAssignmentChip = 'all';
let appliedFilters = {};

function getViewGroupKey(view = activeView) {
  return view.startsWith('archive-') ? 'archive' : view;
}

function getUniqueDocumentRows(rows) {
  const documentNumbers = new Set();
  return rows.filter((row) => {
    const documentNumber = row.querySelector('.invoice-cell strong')?.textContent.trim();
    if (!documentNumber || documentNumbers.has(documentNumber)) return false;
    documentNumbers.add(documentNumber);
    return true;
  });
}

function getActiveRows() {
  const groupKey = getViewGroupKey();
  if (activeDocumentTab === 'receipts') return [];
  if (activeView === 'invoice-all') {
    if (activeDocumentTab === 'applications') {
      return [...applicationRowGroups.requires.querySelectorAll('.table-row')];
    }
    if (activeDocumentTab === 'assignments') {
      return getUniqueDocumentRows([...requiresAssignmentRows, ...counterpartyAssignmentRows, ...allAssignmentSupplementalRows]);
    }
    const finalArchiveRows = [...rowGroups.archive.querySelectorAll('.table-row')]
      .filter((row) => row.dataset.archiveSection === 'completed' || row.dataset.archiveSection === 'rejected');
    return getUniqueDocumentRows([
      ...rowGroups.requires.querySelectorAll('.table-row'),
      ...rowGroups.counterparty.querySelectorAll('.table-row'),
      ...rowGroups.drafts.querySelectorAll('.table-row'),
      ...finalArchiveRows,
    ]);
  }
  if (activeDocumentTab === 'applications') {
    if (activeView === 'working-all') {
      const requiresRows = [...applicationRowGroups.requires.querySelectorAll('.table-row:not(.all-application-row)')];
      const counterpartyRows = [...applicationRowGroups.counterparty.querySelectorAll('.table-row:not(.all-application-row)')];
      const rejectedRows = [...applicationRowGroups.archive.querySelectorAll('.table-row[data-archive-section="rejected"]')];
      if (activeApplicationChip === 'shipper') return requiresRows;
      if (activeApplicationChip === 'carrier') return counterpartyRows;
      if (activeApplicationChip === 'rejected') return rejectedRows;
      return getUniqueDocumentRows([...requiresRows, ...counterpartyRows, ...rejectedRows]);
    }
    const group = applicationRowGroups[groupKey];
    if (!group) return [];
    const groupRows = [...group.querySelectorAll('.table-row:not(.all-application-row)')];
    if (activeView === 'requires') {
      return groupRows.filter((row) => row.dataset.status === 'waiting' || row.dataset.status === 'error');
    }
    if (!activeView.startsWith('archive-')) return groupRows;
    if (activeView === 'archive-all') {
      return getUniqueDocumentRows(groupRows.filter((row) => row.dataset.archiveSection === 'completed'));
    }
    return groupRows.filter((row) => `archive-${row.dataset.archiveSection}` === activeView);
  }
  if (activeDocumentTab === 'assignments') {
    if (activeView === 'working-all') {
      if (activeAssignmentChip === 'shipper') return requiresAssignmentRows;
      if (activeAssignmentChip === 'forwarder') return counterpartyAssignmentRows;
      return [...requiresAssignmentRows, ...counterpartyAssignmentRows];
    }
    if (activeView === 'requires') return requiresAssignmentRows;
    if (activeView === 'counterparty') return counterpartyAssignmentRows;
    if (activeView === 'drafts') return draftAssignmentRows;
    if (activeView === 'archive-all') {
      return archiveAssignmentRows.filter((row) => row.dataset.archiveSection === 'completed');
    }
    if (activeView === 'archive-completed') return archiveAssignmentRows.filter((row) => row.dataset.archiveSection === 'completed');
    if (activeView === 'archive-trash') return archiveAssignmentRows.filter((row) => row.dataset.archiveSection === 'trash');
    return [];
  }
  if (activeView === 'working-all') {
    const workingRows = [
      ...rowGroups.requires.querySelectorAll('.table-row'),
      ...rowGroups.counterparty.querySelectorAll('.table-row'),
    ];
    const rejectedRows = [...rowGroups.archive.querySelectorAll('.table-row[data-archive-section="rejected"]')];
    if (activeInvoiceChip === 'shipper') return [...rowGroups.requires.querySelectorAll('.table-row')];
    if (activeInvoiceChip === 'carrier') return [...rowGroups.counterparty.querySelectorAll('.table-row')].filter((row) => row.dataset.status !== 'unloading');
    if (activeInvoiceChip === 'consignee') return [...rowGroups.counterparty.querySelectorAll('.table-row')].filter((row) => row.dataset.status === 'unloading');
    return [...workingRows, ...rejectedRows];
  }
  const group = rowGroups[groupKey];
  if (!group) return [];
  const groupRows = [...group.querySelectorAll('.table-row')];
  if (activeView === 'counterparty' && activeInvoiceChip === 'carrier') return groupRows.filter((row) => row.dataset.status !== 'unloading');
  if (activeView === 'counterparty' && activeInvoiceChip === 'consignee') return groupRows.filter((row) => row.dataset.status === 'unloading');
  if (!activeView.startsWith('archive-')) return groupRows;
  if (activeView === 'archive-all') {
    return getUniqueDocumentRows(groupRows.filter((row) => row.dataset.archiveSection === 'completed'));
  }
  return groupRows.filter((row) => `archive-${row.dataset.archiveSection}` === activeView);
}

function getActiveSelectAll() {
  if (activeDocumentTab === 'applications') return document.querySelector('#applicationSelectAll');
  if (activeDocumentTab === 'assignments') {
    if (activeView === 'drafts') return document.querySelector('#draftAssignmentSelectAll');
    if (activeView.startsWith('archive-')) return document.querySelector('#archiveAssignmentSelectAll');
    return document.querySelector('#assignmentSelectAll');
  }
  return document.querySelector('#selectAll');
}

function syncSelectAll() {
  const activeRows = getActiveRows();
  if (activeDocumentTab === 'applications' && activeView !== 'invoice-all') {
    allApplicationSupplementalRows.forEach((row) => { row.hidden = true; });
  }
  const checkedRows = activeRows.filter((row) => row.querySelector('.row-checkbox').checked);
  const selectAll = getActiveSelectAll();
  selectAll.checked = activeRows.length > 0 && checkedRows.length === activeRows.length;
  selectAll.indeterminate = checkedRows.length > 0 && checkedRows.length < activeRows.length;
}

function getRowCells(row) {
  const invoice = row.querySelector('.invoice-cell');
  const sender = invoice.nextElementSibling;
  const recipient = sender.nextElementSibling;
  return { invoice, sender, recipient };
}

function getCustomSelectOptions(select) {
  const parts = enhancedFilterSelects.get(select);
  return parts ? [...parts.dropdown.querySelectorAll('[role="option"]')] : [];
}

function closeCustomFilterSelect(select, { restoreFocus = false } = {}) {
  const parts = enhancedFilterSelects.get(select);
  if (!parts) return;
  parts.dropdown.hidden = true;
  parts.trigger.setAttribute('aria-expanded', 'false');
  if (parts.input) parts.input.setAttribute('aria-expanded', 'false');
  getCustomSelectOptions(select).forEach((option) => option.classList.remove('is-active'));
  if (restoreFocus) {
    parts.suppressOpen = true;
    (parts.input || parts.trigger).focus();
    queueMicrotask(() => { parts.suppressOpen = false; });
  }
}

function closeAllCustomFilterSelects(exceptSelect = null) {
  enhancedFilterSelects.forEach((parts, select) => {
    if (select !== exceptSelect) closeCustomFilterSelect(select);
  });
}

function renderCustomFilterOptions(select, query = '') {
  const parts = enhancedFilterSelects.get(select);
  if (!parts) return;
  parts.dropdown.replaceChildren();
  const normalizedQuery = query.trim().toLocaleLowerCase('ru');
  let availableOptions = [...select.options].filter((option) => select === assignmentTopStatusFilter || option.value);
  if (parts.searchable) {
    availableOptions = normalizedQuery
      ? availableOptions.filter((option) => option.textContent.toLocaleLowerCase('ru').includes(normalizedQuery))
      : [];
  }

  if (!availableOptions.length) {
    const empty = document.createElement('div');
    empty.className = 'custom-filter-empty';
    empty.textContent = 'Не найдено';
    parts.dropdown.append(empty);
    return;
  }

  availableOptions.forEach((option) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.setAttribute('role', 'option');
    item.dataset.value = option.value;
    item.textContent = option.textContent;
    item.setAttribute('aria-selected', String(option.value === select.value));
    item.addEventListener('click', () => {
      select.value = option.value;
      syncCustomFilterSelect(select);
      select.dispatchEvent(new Event('change', { bubbles: true }));
      closeCustomFilterSelect(select, { restoreFocus: true });
    });
    item.addEventListener('keydown', (event) => {
      const items = getCustomSelectOptions(select);
      const currentIndex = items.indexOf(item);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        item.classList.remove('is-active');
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        const next = items[(currentIndex + direction + items.length) % items.length];
        next.classList.add('is-active');
        next.focus();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeCustomFilterSelect(select, { restoreFocus: true });
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        item.classList.remove('is-active');
        const target = event.key === 'Home' ? items[0] : items.at(-1);
        target.classList.add('is-active');
        target.focus();
      }
    });
    parts.dropdown.append(item);
  });
}

function syncCustomFilterSelect(select) {
  const parts = enhancedFilterSelects.get(select);
  if (!parts) return;
  const selectedOption = [...select.options].find((option) => option.value === select.value) || select.options[0];
  const selectedText = selectedOption ? selectedOption.textContent : '';
  if (parts.searchable) {
    parts.input.value = select.value ? selectedText : '';
  } else {
    parts.label.textContent = selectedText;
  }
  parts.trigger.classList.toggle('has-value', Boolean(select.value));
  renderCustomFilterOptions(select, parts.searchable ? parts.input.value : '');
}

function openCustomFilterSelect(select) {
  const parts = enhancedFilterSelects.get(select);
  if (!parts || !parts.dropdown.hidden) return;
  closeAllCustomFilterSelects(select);
  closeInvoiceStatusDropdown();
  renderCustomFilterOptions(select, parts.input ? parts.input.value : '');
  parts.dropdown.hidden = false;
  parts.trigger.setAttribute('aria-expanded', 'true');
  if (parts.input) {
    parts.input.setAttribute('aria-expanded', 'true');
    parts.input.focus();
    return;
  }
  const items = getCustomSelectOptions(select);
  const selectedItem = items.find((item) => item.getAttribute('aria-selected') === 'true');
  const firstItem = selectedItem || items[0];
  if (firstItem) {
    firstItem.classList.add('is-active');
    firstItem.focus();
  }
}

function enhanceFilterSelect(select) {
  const searchable = searchableFilterSelects.has(select);
  const wrapper = document.createElement('div');
  wrapper.className = 'filter-control custom-filter-select';
  if (select.classList.contains('status-control')) wrapper.classList.add('status-control');
  if (select === assignmentTopStatusFilter) wrapper.classList.add('assignment-top-status-control');
  select.before(wrapper);
  wrapper.append(select);
  select.className = 'custom-filter-native';
  select.setAttribute('aria-hidden', 'true');
  select.tabIndex = -1;

  const trigger = document.createElement(searchable ? 'div' : 'button');
  trigger.className = 'custom-filter-trigger';
  if (!searchable) {
    trigger.type = 'button';
    trigger.setAttribute('aria-haspopup', 'listbox');
  } else {
    trigger.classList.add('custom-filter-combobox');
  }
  trigger.setAttribute('aria-expanded', 'false');
  const label = searchable ? null : document.createElement('span');
  const input = searchable ? document.createElement('input') : null;
  if (input) {
    input.className = 'custom-filter-search';
    input.type = 'text';
    input.placeholder = select.options[0]?.textContent || '';
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-label', select.options[0]?.textContent || 'Поиск организации');
  }
  const arrow = document.createElement('img');
  arrow.src = './assets/icons/arrow-c-down.svg';
  arrow.alt = '';
  trigger.append(input || label, arrow);

  const dropdown = document.createElement('div');
  dropdown.className = 'custom-filter-dropdown';
  dropdown.setAttribute('role', 'listbox');
  dropdown.setAttribute('aria-label', select.options[0]?.textContent || 'Выберите значение');
  dropdown.hidden = true;
  wrapper.append(trigger, dropdown);
  enhancedFilterSelects.set(select, { wrapper, trigger, label, input, dropdown, searchable });
  syncCustomFilterSelect(select);

  trigger.addEventListener('click', (event) => {
    if (searchable && event.target !== arrow) {
      openCustomFilterSelect(select);
      return;
    }
    if (dropdown.hidden) openCustomFilterSelect(select);
    else closeCustomFilterSelect(select, { restoreFocus: true });
  });

  if (input) {
    input.addEventListener('focus', () => {
      if (!enhancedFilterSelects.get(select).suppressOpen) openCustomFilterSelect(select);
    });
    input.addEventListener('input', () => {
      select.value = '';
      trigger.classList.remove('has-value');
      if (dropdown.hidden) openCustomFilterSelect(select);
      renderCustomFilterOptions(select, input.value);
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        const firstItem = getCustomSelectOptions(select)[0];
        if (firstItem) {
          event.preventDefault();
          firstItem.classList.add('is-active');
          firstItem.focus();
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeCustomFilterSelect(select, { restoreFocus: true });
      }
    });
  }
}

function fillFilterOptions(select, values) {
  const selectedValue = select.value;
  select.length = 1;
  [...new Set(values)].sort((a, b) => a.localeCompare(b, 'ru')).forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
  if ([...select.options].some((option) => option.value === selectedValue)) select.value = selectedValue;
  select.classList.toggle('has-value', Boolean(select.value));
  syncCustomFilterSelect(select);
}

function populateFilterOptions() {
  if (activeDocumentTab === 'assignments') {
    const activeRows = getActiveRows();
    fillFilterOptions(assignmentForwarderFilter, activeRows.map((row) => row.dataset.forwarder).filter(Boolean));
    fillFilterOptions(assignmentShipperFilter, activeRows.map((row) => row.dataset.shipper).filter(Boolean));
    const selectedStatus = assignmentStatusFilter.value;
    const selectedTopStatus = assignmentTopStatusFilter.value;
    assignmentStatusFilter.length = 1;
    assignmentTopStatusFilter.length = 1;
    const archiveAssignmentStatuses = [
      ['assignment-completed', 'Документооборот завершен'],
      ['assignment-signature', 'Требует подписи грузоотправителя'],
      ['assignment-carrier', 'Требует подписи экспедитора'],
      ['assignment-error', 'Ошибка подписи грузоотправителя'],
      ['assignment-draft', 'Черновик'],
    ];
    const assignmentStatuses = activeView === 'invoice-all'
      ? archiveAssignmentStatuses.filter(([value]) => activeRows.some((row) => row.dataset.status === value))
      : activeView === 'drafts'
      ? [['assignment-draft', 'Черновик']]
      : activeView.startsWith('archive-')
      ? archiveAssignmentStatuses.filter(([value]) => activeRows.some((row) => row.dataset.status === value))
      : activeView === 'counterparty'
        ? [['assignment-carrier', 'Требует подписи экспедитора']]
        : activeView === 'working-all'
          ? [
            ['assignment-signature', 'Требует подписи грузоотправителя'],
            ['assignment-error', 'Ошибка подписи грузоотправителя'],
            ['assignment-carrier', 'Требует подписи экспедитора'],
          ]
        : [
        ['assignment-signature', 'Требует подписи грузоотправителя'],
        ['assignment-error', 'Ошибка подписи грузоотправителя'],
      ];
    assignmentStatuses.forEach(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      assignmentStatusFilter.append(option);
      assignmentTopStatusFilter.append(option.cloneNode(true));
    });
    if (assignmentStatuses.some(([value]) => value === selectedStatus)) assignmentStatusFilter.value = selectedStatus;
    if (assignmentStatuses.some(([value]) => value === selectedTopStatus)) assignmentTopStatusFilter.value = selectedTopStatus;
    assignmentStatusFilter.classList.toggle('has-value', Boolean(assignmentStatusFilter.value));
    assignmentTopStatusFilter.classList.toggle('has-value', Boolean(assignmentTopStatusFilter.value));
    syncCustomFilterSelect(assignmentStatusFilter);
    syncCustomFilterSelect(assignmentTopStatusFilter);
    [senderFilter, carrierFilter, recipientFilter, customerFilter, applicationCarrierFilter, applicationSupplyPointFilter]
      .forEach((select) => fillFilterOptions(select, []));
    return;
  }
  if (activeDocumentTab === 'applications') {
    const activeRows = getActiveRows();
    fillFilterOptions(applicationCarrierFilter, activeRows.map((row) => row.dataset.carrier).filter(Boolean));
    fillFilterOptions(applicationSupplyPointFilter, activeRows.map((row) => row.dataset.supplyPoint));
    [senderFilter, carrierFilter, recipientFilter, customerFilter].forEach((select) => fillFilterOptions(select, []));
    return;
  }
  const senders = getActiveRows().map((row) => getRowCells(row).sender.querySelector('strong')?.textContent.trim() || '').filter(Boolean);
  const recipients = getActiveRows().map((row) => getRowCells(row).recipient.querySelector('strong')?.textContent.trim() || '').filter(Boolean);
  fillFilterOptions(senderFilter, senders);
  fillFilterOptions(carrierFilter, senders);
  fillFilterOptions(recipientFilter, recipients);
  fillFilterOptions(customerFilter, recipients);
}

function readAdvancedFilters() {
  return {
    invoiceStatus: invoiceStatusFilter.value,
    sender: senderFilter.value,
    recipient: recipientFilter.value,
    customer: customerFilter.value,
    carrier: carrierFilter.value,
    applicationCarrier: applicationCarrierFilter.value,
    applicationSupplyPoint: applicationSupplyPointFilter.value,
    loadingAddress: loadingAddressFilter.value.trim().toLocaleLowerCase('ru'),
    unloadingAddress: unloadingAddressFilter.value.trim().toLocaleLowerCase('ru'),
    dateFrom: dateFromFilter.value,
    dateTo: dateToFilter.value,
    status: statusFilter.value,
    assignmentForwarder: assignmentForwarderFilter.value,
    assignmentShipper: assignmentShipperFilter.value,
    assignmentLoadingAddress: assignmentLoadingAddressFilter.value.trim().toLocaleLowerCase('ru'),
    assignmentDateFrom: assignmentDateFromFilter.value,
    assignmentDateTo: assignmentDateToFilter.value,
    assignmentStatus: assignmentStatusFilter.value,
  };
}

function getInvoiceDate(invoice) {
  const dateText = invoice.querySelector('.muted').textContent;
  const match = dateText.match(/(\d{2})\.(\d{2})/);
  const year = activeDocumentTab === 'applications' || activeDocumentTab === 'assignments' || activeView === 'drafts' ? '2026' : '2024';
  return match ? `${year}-${match[2]}-${match[1]}` : '';
}

function matchesAdvancedFilters(row) {
  if (activeDocumentTab === 'assignments') {
    const assignmentDate = getInvoiceDate(row.querySelector('.invoice-cell'));
    const loadingAddress = (row.dataset.loadingAddress || '').toLocaleLowerCase('ru');
    return (!appliedFilters.assignmentForwarder || row.dataset.forwarder === appliedFilters.assignmentForwarder)
      && (!appliedFilters.assignmentShipper || row.dataset.shipper === appliedFilters.assignmentShipper)
      && (!appliedFilters.assignmentLoadingAddress || loadingAddress.includes(appliedFilters.assignmentLoadingAddress))
      && (!appliedFilters.assignmentDateFrom || assignmentDate >= appliedFilters.assignmentDateFrom)
      && (!appliedFilters.assignmentDateTo || assignmentDate <= appliedFilters.assignmentDateTo)
      && (!appliedFilters.assignmentStatus || row.dataset.status === appliedFilters.assignmentStatus);
  }
  if (activeDocumentTab === 'applications') {
    const applicationDate = getInvoiceDate(row.querySelector('.invoice-cell'));
    return (!appliedFilters.invoiceStatus || row.dataset.status === appliedFilters.invoiceStatus)
      && (!appliedFilters.applicationCarrier || row.dataset.carrier === appliedFilters.applicationCarrier)
      && (!appliedFilters.applicationSupplyPoint || row.dataset.supplyPoint === appliedFilters.applicationSupplyPoint)
      && (!appliedFilters.dateFrom || applicationDate >= appliedFilters.dateFrom)
      && (!appliedFilters.dateTo || applicationDate <= appliedFilters.dateTo);
  }
  const { invoice, sender, recipient } = getRowCells(row);
  const senderName = sender.querySelector('strong')?.textContent.trim() || '';
  const recipientName = recipient.querySelector('strong')?.textContent.trim() || '';
  const address = recipient.textContent.toLocaleLowerCase('ru');
  const invoiceDate = getInvoiceDate(invoice);
  return (!appliedFilters.invoiceStatus || row.dataset.status === appliedFilters.invoiceStatus)
    && (!appliedFilters.sender || senderName === appliedFilters.sender)
    && (!appliedFilters.recipient || recipientName === appliedFilters.recipient)
    && (!appliedFilters.customer || recipientName === appliedFilters.customer)
    && (!appliedFilters.carrier || senderName === appliedFilters.carrier)
    && (!appliedFilters.loadingAddress || address.includes(appliedFilters.loadingAddress))
    && (!appliedFilters.unloadingAddress || address.includes(appliedFilters.unloadingAddress))
    && (!appliedFilters.dateFrom || invoiceDate >= appliedFilters.dateFrom)
    && (!appliedFilters.dateTo || invoiceDate <= appliedFilters.dateTo)
    && (!appliedFilters.status || row.dataset.orgStatus === appliedFilters.status);
}

function resetAdvancedFilters(update = true) {
  advancedFilterControls.forEach((control) => {
    control.value = '';
    control.classList.remove('has-value');
  });
  setInvoiceStatus('', 'Все статусы');
  enhancedFilterSelects.forEach((parts, select) => syncCustomFilterSelect(select));
  closeAllCustomFilterSelects();
  appliedFilters = {};
  if (update) updateRows();
}

function updateFilterPanelFields() {
  const applicationsMode = activeDocumentTab === 'applications';
  const assignmentsMode = activeDocumentTab === 'assignments';
  const invoicesMode = activeDocumentTab === 'invoices';
  topStatusControl.hidden = invoicesMode || applicationsMode || assignmentsMode;
  filterPanel.classList.toggle('applications-mode', applicationsMode);
  filterPanel.classList.toggle('assignments-mode', assignmentsMode);
  document.querySelector('#applicationFilterRow').hidden = !applicationsMode;
  assignmentFilterFields.hidden = !assignmentsMode;
  standardFilterBottom.hidden = assignmentsMode;
  document.querySelectorAll('.invoice-filter-row').forEach((row) => { row.hidden = applicationsMode || assignmentsMode; });
  const organizationStatusParts = enhancedFilterSelects.get(statusFilter);
  if (organizationStatusParts) organizationStatusParts.wrapper.hidden = applicationsMode || assignmentsMode;
  const assignmentTopStatusParts = enhancedFilterSelects.get(assignmentTopStatusFilter);
  if (assignmentTopStatusParts) {
    assignmentTopStatusParts.wrapper.hidden = !(assignmentsMode && (activeView === 'invoice-all' || activeView === 'requires' || activeView === 'working-all' || activeView === 'archive-all'));
  }
}

function getSearchTextNodes(row) {
  const textNodes = [];

  function visit(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue.trim()) textNodes.push(node);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node !== row && node.matches('.progress, .row-check, .row-actions')) return;
    node.childNodes.forEach(visit);
  }

  visit(row);
  return textNodes;
}

function clearSearchHighlights() {
  document.querySelectorAll('.search-highlight').forEach((highlight) => {
    highlight.replaceWith(document.createTextNode(highlight.textContent));
  });
  rows.forEach((row) => row.normalize());
}

function getSearchPattern(term) {
  const compactNumber = term.replace(/\D/g, '');
  if (/^[\d\s()+-]+$/.test(term) && compactNumber.length > 1) {
    return compactNumber.split('').join('[\\s()+-]*');
  }
  return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightSearchMatches(row, terms) {
  if (!terms.length) return;
  const escapedTerms = terms
    .map(getSearchPattern)
    .sort((a, b) => b.length - a.length);
  const matchPattern = new RegExp(`(${escapedTerms.join('|')})`, 'gi');

  getSearchTextNodes(row).forEach((textNode) => {
    const parts = textNode.nodeValue.split(matchPattern);
    if (parts.length === 1) return;
    const fragment = document.createDocumentFragment();
    parts.forEach((part, index) => {
      if (index % 2 === 1) {
        const highlight = document.createElement('mark');
        highlight.className = 'search-highlight';
        highlight.textContent = part;
        fragment.append(highlight);
      } else if (part) {
        fragment.append(document.createTextNode(part));
      }
    });
    textNode.replaceWith(fragment);
  });
}

function updateRows() {
  clearSearchHighlights();
  searchClear.hidden = search.value.length === 0;
  const terms = search.value.trim().toLocaleLowerCase('ru').split(/\s+/).filter(Boolean);
  const activeRows = getActiveRows();
  const mixesAllInvoiceTypes = activeDocumentTab === 'invoices' && activeView === 'working-all' && activeInvoiceChip === 'all';
  const mixesAllApplicationTypes = activeDocumentTab === 'applications' && activeView === 'working-all' && activeApplicationChip === 'all';
  tableWrap.classList.toggle('invoice-all-chip', mixesAllInvoiceTypes || mixesAllApplicationTypes);
  rows.forEach((row) => { row.style.order = ''; });
  if (mixesAllInvoiceTypes) {
    const requiresRows = activeRows.filter((row) => row.parentElement === rowGroups.requires);
    const carrierRows = activeRows.filter((row) => row.parentElement === rowGroups.counterparty && row.dataset.status !== 'unloading');
    const consigneeRows = activeRows.filter((row) => row.parentElement === rowGroups.counterparty && row.dataset.status === 'unloading');
    const rejectedRows = activeRows.filter((row) => row.parentElement === rowGroups.archive && row.dataset.archiveSection === 'rejected');
    const groups = [requiresRows, carrierRows, consigneeRows, rejectedRows];
    const mixedRows = [];
    while (groups.some((group) => group.length)) {
      groups.forEach((group) => {
        if (group.length) mixedRows.push(group.shift());
      });
    }
    mixedRows.forEach((row, index) => { row.style.order = String(index + 1); });
  }
  if (mixesAllApplicationTypes) {
    const requiresRows = activeRows.filter((row) => row.parentElement === applicationRowGroups.requires);
    const counterpartyRows = activeRows.filter((row) => row.parentElement === applicationRowGroups.counterparty);
    const rejectedRows = activeRows.filter((row) => row.parentElement === applicationRowGroups.archive);
    const groups = [requiresRows, counterpartyRows, rejectedRows];
    const mixedRows = [];
    while (groups.some((group) => group.length)) {
      groups.forEach((group) => {
        if (group.length) mixedRows.push(group.shift());
      });
    }
    mixedRows.forEach((row, index) => { row.style.order = String(index + 1); });
  }
  if (activeDocumentTab === 'applications' && activeView !== 'invoice-all') {
    allApplicationSupplementalRows.forEach((row) => { row.hidden = true; });
  }
  if (activeDocumentTab === 'assignments' && activeView !== 'invoice-all') {
    allAssignmentSupplementalRows.forEach((row) => { row.hidden = true; });
  }
  if (activeView === 'invoice-all') {
    const groups = activeDocumentTab === 'applications' ? applicationRowGroups : rowGroups;
    Object.values(groups).forEach((group) => {
      group.querySelectorAll('.table-row').forEach((row) => { row.hidden = !activeRows.includes(row); });
    });
    if (activeDocumentTab === 'assignments') {
      assignmentRows.forEach((row) => { row.hidden = !activeRows.includes(row); });
    }
  }
  if (activeDocumentTab === 'invoices' && activeView === 'working-all') {
    Object.values(rowGroups).forEach((group) => {
      group.querySelectorAll('.table-row').forEach((row) => { row.hidden = !activeRows.includes(row); });
    });
  }
  if (activeDocumentTab === 'applications' && activeView === 'working-all') {
    Object.values(applicationRowGroups).forEach((group) => {
      group.querySelectorAll('.table-row').forEach((row) => { row.hidden = !activeRows.includes(row); });
    });
  }
  if (activeDocumentTab === 'assignments' && !activeView.startsWith('archive-') && activeView !== 'drafts') {
    [...requiresAssignmentRows, ...counterpartyAssignmentRows].forEach((row) => {
      row.hidden = !activeRows.includes(row);
    });
  }
  if (activeDocumentTab === 'invoices' && activeView === 'counterparty') {
    rowGroups.counterparty.querySelectorAll('.table-row').forEach((row) => {
      row.hidden = !activeRows.includes(row);
    });
  }
  if (getViewGroupKey() === 'archive') {
    const archiveGroup = activeDocumentTab === 'applications' ? applicationRowGroups.archive : rowGroups.archive;
    if (activeDocumentTab === 'assignments') {
      archiveAssignmentRows.forEach((row) => { row.hidden = !activeRows.includes(row); });
    } else {
      archiveGroup.querySelectorAll('.table-row').forEach((row) => {
        row.hidden = !activeRows.includes(row);
      });
    }
  }
  let visible = 0;
  activeRows.forEach((row) => {
    const searchTarget = activeDocumentTab === 'applications' || activeDocumentTab === 'assignments' ? row.querySelector('.invoice-cell') : row;
    const searchTextNodes = getSearchTextNodes(searchTarget);
    const matchesText = terms.every((term) => {
      const termPattern = new RegExp(getSearchPattern(term), 'i');
      return searchTextNodes.some((node) => termPattern.test(node.nodeValue));
    });
    const matchesFilter = matchesAdvancedFilters(row);
    row.hidden = !(matchesText && matchesFilter);
    if (!row.hidden) {
      visible += 1;
      highlightSearchMatches(row, terms);
    }
  });
  if (activeDocumentTab === 'assignments') {
    const usesActiveAssignmentsTable = activeView === 'invoice-all' || activeView === 'requires' || activeView === 'counterparty' || activeView === 'working-all';
    assignmentsNoResults.querySelector('strong').textContent = activeView === 'counterparty' ? 'Поручения не найдены' : 'Поручения не найдены';
    assignmentsNoResults.hidden = !usesActiveAssignmentsTable || visible !== 0;
    counterpartyAssignmentsNoResults.hidden = true;
    draftAssignmentsNoResults.hidden = activeView !== 'drafts' || visible !== 0;
    archiveAssignmentsNoResults.hidden = !activeView.startsWith('archive-') || visible !== 0;
    emptyState.hidden = true;
    return;
  }
  assignmentsNoResults.hidden = true;
  counterpartyAssignmentsNoResults.hidden = true;
  draftAssignmentsNoResults.hidden = true;
  archiveAssignmentsNoResults.hidden = true;
  emptyState.querySelector('strong').textContent = activeDocumentTab === 'applications'
    ? activeView.startsWith('archive-') ? 'Заказы-заявки не найдены' : 'Заявки не найдены'
    : 'Накладные не найдены';
  emptyState.hidden = visible !== 0;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('visible'), 1800);
}

search.addEventListener('input', updateRows);
searchClear.addEventListener('click', () => {
  search.value = '';
  updateRows();
  search.focus();
});

filterButton.addEventListener('click', () => {
  const willOpen = filterPanel.hidden;
  filterPanel.hidden = !willOpen;
  filterButton.setAttribute('aria-expanded', String(willOpen));
  toolbar.classList.toggle('filters-open', willOpen);
  if (willOpen) populateFilterOptions();
  else closeAllCustomFilterSelects();
});

function closeInvoiceStatusDropdown({ restoreFocus = false } = {}) {
  invoiceStatusDropdown.hidden = true;
  invoiceStatusTrigger.setAttribute('aria-expanded', 'false');
  invoiceStatusOptions.forEach((option) => option.classList.remove('is-active'));
  if (restoreFocus) invoiceStatusTrigger.focus();
}

function getVisibleInvoiceStatusOptions() {
  return invoiceStatusOptions.filter((option) => !option.hidden);
}

function openInvoiceStatusDropdown() {
  invoiceStatusDropdown.hidden = false;
  invoiceStatusTrigger.setAttribute('aria-expanded', 'true');
  const visibleOptions = getVisibleInvoiceStatusOptions();
  const selectedOption = visibleOptions.find((option) => option.getAttribute('aria-selected') === 'true');
  const firstOption = selectedOption || visibleOptions[0];
  firstOption.classList.add('is-active');
  firstOption.focus();
}

function setInvoiceStatus(value, label) {
  invoiceStatusFilter.value = value;
  invoiceStatusLabel.textContent = label;
  invoiceStatusTrigger.classList.toggle('has-value', Boolean(value));
  invoiceStatusOptions.forEach((option) => {
    option.setAttribute('aria-selected', String(option.dataset.value === value));
  });
}

function selectInvoiceStatus(option) {
  setInvoiceStatus(option.dataset.value, option.textContent.trim());
  appliedFilters.invoiceStatus = invoiceStatusFilter.value;
  closeInvoiceStatusDropdown({ restoreFocus: true });
  updateRows();
}

function updateInvoiceStatusOptions() {
  const activeStatusView = getViewGroupKey();
  invoiceStatusOptions.forEach((option) => {
    const optionStatusView = option.dataset.statusView || '';
    const matchesStatusView = activeView === 'invoice-all' || !optionStatusView || (activeView === 'working-all'
      ? optionStatusView === 'requires' || optionStatusView === 'counterparty'
      : optionStatusView === activeStatusView);
    const allowedArchiveViews = option.dataset.archiveViews?.split(',') || [];
    const isAllowedArchiveView = activeView === 'invoice-all' || !allowedArchiveViews.length || allowedArchiveViews.includes(activeView);
    option.hidden = activeDocumentTab === 'applications'
      ? (option.dataset.documentTab !== 'applications' || !matchesStatusView || !isAllowedArchiveView) && Boolean(option.dataset.value)
      : option.dataset.documentTab === 'applications' || !matchesStatusView || !isAllowedArchiveView;
  });
  const visibleStatuses = new Set();
  invoiceStatusOptions.forEach((option) => {
    if (option.hidden) return;
    const statusKey = option.dataset.value || option.textContent.trim();
    if (visibleStatuses.has(statusKey)) option.hidden = true;
    else visibleStatuses.add(statusKey);
  });
}

function syncStatusTabs() {
  documentTypeTabs.hidden = !archiveMenuMode && activeView !== 'archive-trash';
  statusTabsContainer.hidden = activeDocumentTab === 'receipts' || archiveMenuMode || activeView === 'archive-trash';
  if (archiveMenuMode) receiptsTab.hidden = true;
  statusTabs.forEach((tab) => {
    const isInvoiceTab = tab.classList.contains('invoice-status-tab');
    const isApplicationTab = tab.classList.contains('application-status-tab');
    const isAssignmentTab = tab.classList.contains('assignment-status-tab');
    tab.hidden = activeDocumentTab === 'invoices'
      ? !isInvoiceTab
      : activeDocumentTab === 'applications'
        ? !isApplicationTab
        : activeDocumentTab === 'assignments'
          ? !isAssignmentTab
          : isInvoiceTab || isApplicationTab || isAssignmentTab;
    const invoiceWorkSelected = activeDocumentTab === 'invoices'
      && tab.dataset.statusView === 'working-all'
      && ['working-all', 'requires', 'counterparty', 'archive-rejected'].includes(activeView);
    const applicationWorkSelected = activeDocumentTab === 'applications'
      && tab.dataset.statusView === 'working-all'
      && ['working-all', 'requires', 'counterparty', 'archive-rejected'].includes(activeView);
    const assignmentWorkSelected = activeDocumentTab === 'assignments'
      && tab.dataset.statusView === 'working-all'
      && ['working-all', 'requires', 'counterparty'].includes(activeView);
    const isSelected = invoiceWorkSelected || applicationWorkSelected || assignmentWorkSelected || tab.dataset.statusView === activeView;
    tab.classList.toggle('selected', isSelected);
    tab.setAttribute('aria-selected', String(isSelected));
  });
  const showInvoiceChips = activeDocumentTab === 'invoices';
  invoicePartyChips.hidden = !showInvoiceChips;
  invoicePartyChipButtons.forEach((chip) => {
    const isSelected = activeView !== 'drafts' && chip.dataset.invoiceChip === activeInvoiceChip;
    chip.classList.toggle('selected', isSelected);
    chip.setAttribute('aria-selected', String(isSelected));
  });
  const showApplicationChips = activeDocumentTab === 'applications';
  applicationPartyChips.hidden = !showApplicationChips;
  applicationPartyChipButtons.forEach((chip) => {
    const isSelected = activeView !== 'drafts' && chip.dataset.applicationChip === activeApplicationChip;
    chip.classList.toggle('selected', isSelected);
    chip.setAttribute('aria-selected', String(isSelected));
  });
  const showAssignmentChips = activeDocumentTab === 'assignments';
  assignmentPartyChips.hidden = !showAssignmentChips;
  assignmentPartyChipButtons.forEach((chip) => {
    const isSelected = activeView !== 'drafts' && chip.dataset.assignmentChip === activeAssignmentChip;
    chip.classList.toggle('selected', isSelected);
    chip.setAttribute('aria-selected', String(isSelected));
  });
}

function syncDocumentMenu() {
  const documentTitles = {
    applications: 'Заказы-заявки',
    assignments: 'Поручения экспедиторам',
    receipts: 'Экспедиторские расписки',
    invoices: 'Накладные',
  };
  const trashIsActive = activeView === 'archive-trash';
  const archiveIsActive = archiveMenuMode;
  pageTitle.textContent = trashIsActive
    ? 'Корзина'
    : archiveIsActive
      ? 'Архив'
      : documentTitles[activeDocumentTab] || 'Накладные';
  documentMenuItems.forEach((item) => {
    const isSelected = !trashIsActive && !archiveIsActive && item.dataset.documentMenu === activeDocumentTab;
    item.classList.toggle('active', isSelected);
    if (isSelected) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });
  archiveMenuItem.classList.toggle('active', archiveIsActive);
  if (archiveIsActive) archiveMenuItem.setAttribute('aria-current', 'page');
  else archiveMenuItem.removeAttribute('aria-current');
}

invoiceStatusTrigger.addEventListener('click', () => {
  if (invoiceStatusDropdown.hidden) openInvoiceStatusDropdown();
  else closeInvoiceStatusDropdown();
});

invoiceStatusOptions.forEach((option) => {
  option.addEventListener('click', () => selectInvoiceStatus(option));
  option.addEventListener('keydown', (event) => {
    const visibleOptions = getVisibleInvoiceStatusOptions();
    const currentIndex = visibleOptions.indexOf(option);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      option.classList.remove('is-active');
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (currentIndex + direction + visibleOptions.length) % visibleOptions.length;
      visibleOptions[nextIndex].classList.add('is-active');
      visibleOptions[nextIndex].focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeInvoiceStatusDropdown({ restoreFocus: true });
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      option.classList.remove('is-active');
      const target = event.key === 'Home' ? visibleOptions[0] : visibleOptions.at(-1);
      target.classList.add('is-active');
      target.focus();
    }
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.status-select')) closeInvoiceStatusDropdown();
  if (!event.target.closest('.custom-filter-select')) closeAllCustomFilterSelects();
});

advancedFilterControls.filter((control) => control.tagName === 'SELECT').forEach((select) => {
  select.addEventListener('change', () => select.classList.toggle('has-value', Boolean(select.value)));
});

[dateFromFilter, dateToFilter, assignmentDateFromFilter, assignmentDateToFilter].forEach((dateInput) => {
  dateInput.addEventListener('input', () => dateInput.classList.toggle('has-value', Boolean(dateInput.value)));
});

applyFilters.addEventListener('click', () => {
  appliedFilters = readAdvancedFilters();
  updateRows();
});

resetFilters.addEventListener('click', () => resetAdvancedFilters());

applyAssignmentFilters.addEventListener('click', () => {
  appliedFilters = readAdvancedFilters();
  assignmentTopStatusFilter.value = appliedFilters.assignmentStatus;
  syncCustomFilterSelect(assignmentTopStatusFilter);
  updateRows();
});

assignmentTopStatusFilter.addEventListener('change', () => {
  assignmentStatusFilter.value = assignmentTopStatusFilter.value;
  syncCustomFilterSelect(assignmentStatusFilter);
  appliedFilters.assignmentStatus = assignmentTopStatusFilter.value;
  updateRows();
});

resetAssignmentFilters.addEventListener('click', () => resetAdvancedFilters());

sectionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    receiptDetailView.hidden = true;
    assignmentDetailView.hidden = true;
    applicationDetailView.hidden = true;
    invoiceDetailView.hidden = true;
    document.querySelector('.page-header').hidden = false;
    document.querySelector('.workspace').hidden = false;
    activeView = button.dataset.view;
    if (activeView === 'archive-trash') archiveMenuMode = false;
    if (activeView === 'archive-trash') {
      activeDocumentTab = 'invoices';
      document.querySelectorAll('.tabs button').forEach((tab) => {
        const isInvoicesTab = tab === invoicesTab;
        tab.classList.toggle('selected', isInvoicesTab);
        tab.setAttribute('aria-selected', String(isInvoicesTab));
      });
    }
    const activeGroupKey = getViewGroupKey();
    const documentsSectionExpanded = activeView === 'working-all' || activeView === 'requires' || activeView === 'counterparty';
    const isArchiveView = activeView.startsWith('archive-');
    const archiveSectionExpanded = activeView === 'archive-all' || activeView === 'archive-completed' || activeView === 'archive-rejected';
    documentsInProgressNav.setAttribute('aria-expanded', String(documentsSectionExpanded));
    documentSubnavButtons.forEach((item) => { item.hidden = !documentsSectionExpanded; });
    archiveNav.setAttribute('aria-expanded', String(archiveSectionExpanded));
    archiveSubnavButtons.forEach((item) => { item.hidden = !archiveSectionExpanded; });
    applicationTab.textContent = 'Заказы-заявки';
    const archiveHasAssignments = activeView === 'archive-all' || activeView === 'archive-completed' || activeView === 'archive-trash';
    assignmentsTab.hidden = isArchiveView && !archiveHasAssignments;
    const archiveHasReceipts = activeView === 'archive-all' || activeView === 'archive-completed';
    receiptsTab.hidden = !archiveHasReceipts;
    if (activeDocumentTab === 'receipts' && !archiveHasReceipts) {
      activeDocumentTab = 'applications';
      document.querySelectorAll('.tabs button').forEach((tab) => {
        const isApplicationsTab = tab === applicationTab;
        tab.classList.toggle('selected', isApplicationsTab);
        tab.setAttribute('aria-selected', String(isApplicationsTab));
      });
    }
    if (activeDocumentTab === 'assignments' && isArchiveView && !archiveHasAssignments) {
      activeDocumentTab = 'applications';
      document.querySelectorAll('.tabs button').forEach((tab) => {
        const isApplicationsTab = tab === applicationTab;
        tab.classList.toggle('selected', isApplicationsTab);
        tab.setAttribute('aria-selected', String(isApplicationsTab));
      });
    }
    invoiceTableHead.hidden = activeDocumentTab !== 'invoices';
    applicationTableHead.hidden = activeDocumentTab !== 'applications';
    tableWrap.hidden = activeDocumentTab === 'assignments' || activeDocumentTab === 'receipts';
    assignmentsView.hidden = activeDocumentTab !== 'assignments' || (activeView !== 'invoice-all' && activeView !== 'requires' && activeView !== 'counterparty' && activeView !== 'working-all');
    counterpartyAssignmentsView.hidden = true;
    draftAssignmentsView.hidden = activeDocumentTab !== 'assignments' || activeView !== 'drafts';
    archiveAssignmentsView.hidden = activeDocumentTab !== 'assignments' || !archiveHasAssignments;
    const activeViewHasAssignments = activeView === 'invoice-all' || activeView === 'working-all' || activeView === 'requires' || activeView === 'counterparty' || activeView === 'drafts' || archiveHasAssignments;
    assignmentsEmpty.hidden = activeDocumentTab !== 'assignments' || activeViewHasAssignments;
    receiptsView.hidden = activeDocumentTab !== 'receipts' || !archiveHasReceipts;
    toolbar.hidden = activeDocumentTab === 'receipts' || (activeDocumentTab === 'assignments' && !activeViewHasAssignments);
    Object.entries(rowGroups).forEach(([view, group]) => {
      const belongsToWorkingAll = activeView === 'working-all'
        && (view === 'requires' || view === 'counterparty' || (view === 'archive' && activeInvoiceChip === 'all'));
      const belongsToInvoiceAll = activeView === 'invoice-all';
      group.hidden = activeDocumentTab !== 'invoices' || (!belongsToInvoiceAll && !belongsToWorkingAll && view !== activeGroupKey);
    });
    Object.entries(applicationRowGroups).forEach(([view, group]) => {
      const belongsToWorkingAll = activeView === 'working-all'
        && (view === 'requires' || view === 'counterparty' || (view === 'archive' && (activeApplicationChip === 'all' || activeApplicationChip === 'rejected')));
      const belongsToInvoiceAll = activeView === 'invoice-all' && view === 'requires';
      group.hidden = activeDocumentTab !== 'applications' || (activeView === 'invoice-all' ? !belongsToInvoiceAll : (!belongsToWorkingAll && view !== activeGroupKey));
    });
    sectionButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      if (isActive) {
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });
    const archiveTitles = {
      'archive-all': 'Все завершенные документы',
      'archive-completed': 'Согласованные',
      'archive-rejected': 'Отказанные',
      'archive-trash': 'Корзина',
    };
    const documentTitles = {
      applications: 'Заказы-заявки',
      assignments: 'Поручения экспедиторам',
      receipts: 'Экспедиторские расписки',
      invoices: 'Накладные',
    };
    pageTitle.textContent = documentTitles[activeDocumentTab] || 'Накладные';
    document.title = 'Тест статусной модели (5 вариант)';
    toolbar.classList.toggle('applications-mode', activeDocumentTab === 'applications');
    toolbar.classList.toggle('assignments-mode', activeDocumentTab === 'assignments');
    toolbar.classList.toggle('drafts-mode', activeView === 'drafts');
    updateFilterPanelFields();
    filterPanel.hidden = true;
    filterButton.setAttribute('aria-expanded', 'false');
    toolbar.classList.remove('filters-open');
    search.value = '';
    search.placeholder = activeDocumentTab === 'applications'
      ? 'Поиск по номеру заявки'
      : activeDocumentTab === 'assignments'
        ? 'Поиск по номеру поручения'
        : 'Поиск по водителю, номеру телефона, номеру машины и прицепа, названию накладной';
    search.setAttribute('aria-label', activeDocumentTab === 'applications' ? 'Поиск по заявкам' : activeDocumentTab === 'assignments' ? 'Поиск по поручениям' : 'Поиск по накладным');
    resetAdvancedFilters(false);
    closeInvoiceStatusDropdown();
    updateInvoiceStatusOptions();
    populateFilterOptions();
    [document.querySelector('#selectAll'), document.querySelector('#applicationSelectAll'), document.querySelector('#assignmentSelectAll'), document.querySelector('#counterpartyAssignmentSelectAll'), document.querySelector('#draftAssignmentSelectAll'), document.querySelector('#archiveAssignmentSelectAll')].forEach((selectAll) => {
      selectAll.checked = false;
      selectAll.indeterminate = false;
    });
    rows.forEach((row) => {
      row.classList.remove('selected-row');
      row.querySelector('.row-checkbox').checked = false;
    });
    updateRows();
    updateReceiptsForView(true);
    syncStatusTabs();
    syncDocumentMenu();
  });
});

statusTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (activeDocumentTab === 'invoices' && tab.dataset.statusView === 'working-all') {
      activeInvoiceChip = 'all';
      document.querySelector('#workingAllNav').click();
      return;
    }
    if (activeDocumentTab === 'applications' && tab.dataset.statusView === 'working-all') {
      activeApplicationChip = 'all';
      document.querySelector('#workingAllNav').click();
      return;
    }
    if (activeDocumentTab === 'assignments' && tab.dataset.statusView === 'working-all') {
      activeAssignmentChip = 'all';
      document.querySelector('#workingAllNav').click();
      return;
    }
    document.querySelector(`[data-view="${tab.dataset.statusView}"]`)?.click();
  });
});

invoicePartyChipButtons.forEach((chip) => {
  chip.addEventListener('click', () => {
    activeInvoiceChip = chip.dataset.invoiceChip;
    const targetView = activeInvoiceChip === 'all'
      ? 'working-all'
      : activeInvoiceChip === 'shipper'
      ? 'requires'
      : activeInvoiceChip === 'rejected'
        ? 'archive-rejected'
        : 'counterparty';
    document.querySelector(`[data-view="${targetView}"]`)?.click();
  });
});

applicationPartyChipButtons.forEach((chip) => {
  chip.addEventListener('click', () => {
    activeApplicationChip = chip.dataset.applicationChip;
    const targetView = activeApplicationChip === 'all'
      ? 'working-all'
      : activeApplicationChip === 'shipper'
        ? 'requires'
        : activeApplicationChip === 'rejected'
          ? 'archive-rejected'
          : 'counterparty';
    document.querySelector(`[data-view="${targetView}"]`)?.click();
  });
});

assignmentPartyChipButtons.forEach((chip) => {
  chip.addEventListener('click', () => {
    activeAssignmentChip = chip.dataset.assignmentChip;
    const targetView = activeAssignmentChip === 'all'
      ? 'working-all'
      : activeAssignmentChip === 'shipper'
        ? 'requires'
        : 'counterparty';
    document.querySelector(`[data-view="${targetView}"]`)?.click();
  });
});

documentMenuItems.forEach((item) => {
  item.addEventListener('click', () => {
    archiveMenuMode = false;
    documentTypeTabs.hidden = true;
    const documentType = item.dataset.documentMenu;
    if (documentType === 'receipts') {
      document.querySelector('#archiveAllNav').click();
      receiptsTab.hidden = false;
      receiptsTab.click();
    } else {
      const targetTab = documentType === 'applications'
        ? applicationTab
        : documentType === 'assignments'
          ? assignmentsTab
          : invoicesTab;
      targetTab.click();
      if (documentType === 'invoices') {
        activeInvoiceChip = 'all';
        document.querySelector('#workingAllNav').click();
      } else if (documentType === 'applications') {
        activeApplicationChip = 'all';
        document.querySelector('#workingAllNav').click();
      } else if (documentType === 'assignments') {
        activeAssignmentChip = 'all';
        document.querySelector('#workingAllNav').click();
      } else {
        document.querySelector('#invoiceAllViewNav').click();
      }
    }
    syncDocumentMenu();
    syncStatusTabs();
  });
});

archiveMenuItem.addEventListener('click', () => {
  archiveMenuMode = true;
  documentTypeTabs.hidden = false;
  receiptsTab.hidden = true;
  assignmentsTab.click();
  document.querySelector('#archiveAllNav').click();
  documentTypeTabs.hidden = false;
  receiptsTab.hidden = true;
  syncDocumentMenu();
  syncStatusTabs();
});

documentsInProgressNav.addEventListener('click', () => {
  document.querySelector('#workingAllNav').click();
});

archiveNav.addEventListener('click', () => {
  activeDocumentTab = 'applications';
  document.querySelectorAll('.tabs button').forEach((tab) => {
    const isApplicationsTab = tab === applicationTab;
    tab.classList.toggle('selected', isApplicationsTab);
    tab.setAttribute('aria-selected', String(isApplicationsTab));
  });
  document.querySelector('#archiveAllNav').click();
});

document.querySelectorAll('.tabs button').forEach((tab) => {
  tab.addEventListener('click', () => {
    activeDocumentTab = tab.dataset.tab === 'Заявки'
      ? 'applications'
      : tab.dataset.tab === 'Поручения'
        ? 'assignments'
        : tab.dataset.tab === 'Расписки' ? 'receipts' : 'invoices';
    document.querySelectorAll('.tabs button').forEach((item) => {
      item.classList.toggle('selected', item === tab);
      item.setAttribute('aria-selected', String(item === tab));
    });
    invoiceTableHead.hidden = activeDocumentTab !== 'invoices';
    applicationTableHead.hidden = activeDocumentTab !== 'applications';
    tableWrap.hidden = activeDocumentTab === 'assignments' || activeDocumentTab === 'receipts';
    assignmentsView.hidden = activeDocumentTab !== 'assignments' || (activeView !== 'invoice-all' && activeView !== 'requires' && activeView !== 'counterparty' && activeView !== 'working-all');
    counterpartyAssignmentsView.hidden = true;
    draftAssignmentsView.hidden = activeDocumentTab !== 'assignments' || activeView !== 'drafts';
    const archiveHasAssignments = activeView === 'archive-all' || activeView === 'archive-completed' || activeView === 'archive-trash';
    archiveAssignmentsView.hidden = activeDocumentTab !== 'assignments' || !archiveHasAssignments;
    const activeViewHasAssignments = activeView === 'invoice-all' || activeView === 'working-all' || activeView === 'requires' || activeView === 'counterparty' || activeView === 'drafts' || archiveHasAssignments;
    assignmentsEmpty.hidden = activeDocumentTab !== 'assignments' || activeViewHasAssignments;
    const archiveHasReceipts = activeView === 'archive-all' || activeView === 'archive-completed';
    receiptsView.hidden = activeDocumentTab !== 'receipts' || !archiveHasReceipts;
    toolbar.hidden = activeDocumentTab === 'receipts' || (activeDocumentTab === 'assignments' && !activeViewHasAssignments);
    const activeGroupKey = getViewGroupKey();
    Object.entries(applicationRowGroups).forEach(([view, group]) => {
      const belongsToWorkingAll = activeView === 'working-all'
        && (view === 'requires' || view === 'counterparty' || (view === 'archive' && (activeApplicationChip === 'all' || activeApplicationChip === 'rejected')));
      const belongsToInvoiceAll = activeView === 'invoice-all' && view === 'requires';
      group.hidden = activeDocumentTab !== 'applications' || (activeView === 'invoice-all' ? !belongsToInvoiceAll : (!belongsToWorkingAll && view !== activeGroupKey));
    });
    Object.entries(rowGroups).forEach(([view, group]) => {
      const belongsToWorkingAll = activeView === 'working-all' && (view === 'requires' || view === 'counterparty');
      const belongsToInvoiceAll = activeView === 'invoice-all';
      group.hidden = activeDocumentTab !== 'invoices' || (!belongsToInvoiceAll && !belongsToWorkingAll && view !== activeGroupKey);
    });
    toolbar.classList.toggle('applications-mode', activeDocumentTab === 'applications');
    toolbar.classList.toggle('assignments-mode', activeDocumentTab === 'assignments');
    toolbar.classList.toggle('drafts-mode', activeView === 'drafts');
    updateFilterPanelFields();
    filterPanel.hidden = true;
    filterButton.setAttribute('aria-expanded', 'false');
    toolbar.classList.remove('filters-open');
    search.value = '';
    search.placeholder = activeDocumentTab === 'applications'
      ? 'Поиск по номеру заявки'
      : activeDocumentTab === 'assignments'
        ? 'Поиск по номеру поручения'
        : 'Поиск по водителю, номеру телефона, номеру машины и прицепа, названию накладной';
    search.setAttribute('aria-label', activeDocumentTab === 'applications' ? 'Поиск по заявкам' : activeDocumentTab === 'assignments' ? 'Поиск по поручениям' : 'Поиск по накладным');
    resetAdvancedFilters(false);
    closeInvoiceStatusDropdown();
    updateInvoiceStatusOptions();
    populateFilterOptions();
    rows.forEach((row) => {
      row.classList.remove('selected-row');
      row.querySelector('.row-checkbox').checked = false;
    });
    [document.querySelector('#selectAll'), document.querySelector('#applicationSelectAll'), document.querySelector('#assignmentSelectAll'), document.querySelector('#counterpartyAssignmentSelectAll'), document.querySelector('#draftAssignmentSelectAll'), document.querySelector('#archiveAssignmentSelectAll')].forEach((selectAll) => {
      selectAll.checked = false;
      selectAll.indeterminate = false;
    });
    updateRows();
    updateReceiptsForView(true);
    syncDocumentMenu();
  });
});

const receiptsTable = document.querySelector('.receipts-table');
const receiptSeedRows = [...receiptsTable.querySelectorAll('.receipt-row')];
const extraReceiptDates = [
  '09.07', '08.07', '07.07', '06.07', '05.07',
  '04.07', '03.07', '02.07', '01.07', '30.06',
  '29.06', '28.06', '27.06', '26.06', '25.06',
  '24.06', '23.06', '22.06', '21.06', '20.06',
];

extraReceiptDates.forEach((date, index) => {
  const row = receiptSeedRows[index % receiptSeedRows.length].cloneNode(true);
  row.querySelector(':scope > div:first-child strong').textContent = String(676541 + index).padStart(10, '0');
  row.querySelector(':scope > div:first-child .receipt-muted').textContent = `от ${date}`;
  receiptsTable.append(row);
});

const receiptRows = [...receiptsTable.querySelectorAll('.receipt-row')];
const receiptAssignmentRows = new Map();
const completedAssignmentsForReceipts = archiveAssignmentRows.filter((row) => (
  row.dataset.archiveSection === 'completed'
  && row.dataset.status === 'assignment-completed'
));
const receiptDates = [
  '25.08', '24.08', '23.08', '22.08', '21.08',
  '20.08', '19.08', '18.08', '17.08', '16.08',
  '15.08', '14.08', '13.08', '12.08', '11.08',
  '10.08', '09.08', '08.08', '07.08', '06.08',
  '05.08', '04.08', '03.08', '02.08', '01.08',
];
receiptRows.forEach((row, index) => {
  const receiptSuffix = String(20 + index * 37).padStart(3, '0');
  const receiptNumber = `ЭР/201704-${receiptSuffix}`;
  const firstCell = row.querySelector(':scope > div:first-child');
  const forwarderCell = row.querySelector(':scope > div:nth-child(2)');
  const assignmentRow = completedAssignmentsForReceipts[index % completedAssignmentsForReceipts.length];
  const assignmentNumber = assignmentRow.querySelector('.invoice-cell strong').textContent.trim();
  const assignmentDate = assignmentRow.querySelector('.invoice-cell .muted').textContent.trim();
  receiptAssignmentRows.set(row, assignmentRow);

  firstCell.querySelector('strong').textContent = receiptNumber;
  firstCell.querySelector('.receipt-muted').textContent = `от ${receiptDates[index % receiptDates.length]}`;
  firstCell.querySelector('.receipt-status').textContent = 'Документооборот завершен';

  forwarderCell.querySelector('.forwarding-order')?.remove();
  const assignmentLink = document.createElement('a');
  assignmentLink.className = 'forwarding-order';
  assignmentLink.href = '#';
  assignmentLink.setAttribute('aria-label', `Открыть поручение ${assignmentNumber}`);
  assignmentLink.append(`${assignmentNumber} ${assignmentDate}`);
  const assignmentIcon = document.createElement('img');
  assignmentIcon.src = './assets/icons/arrow-ui-corner-out-up-right.svg';
  assignmentIcon.alt = '';
  assignmentLink.append(assignmentIcon);
  forwarderCell.append(assignmentLink);
});
const receiptsPagination = document.querySelector('.receipts-pagination');
const receiptsPerPage = 20;
const receiptsPageCount = Math.ceil(receiptRows.length / receiptsPerPage);
let activeReceiptsPage = 1;

function showReceiptsPage(page) {
  activeReceiptsPage = Math.min(Math.max(page, 1), receiptsPageCount);
  receiptRows.forEach((row, index) => {
    row.hidden = Math.floor(index / receiptsPerPage) + 1 !== activeReceiptsPage;
  });
  receiptsPagination.querySelectorAll('[data-receipts-page]').forEach((button) => {
    const isSelected = Number(button.dataset.receiptsPage) === activeReceiptsPage;
    button.classList.toggle('selected', isSelected);
    if (isSelected) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  const nextButton = receiptsPagination.querySelector('.receipts-next');
  if (nextButton) nextButton.disabled = activeReceiptsPage === receiptsPageCount;
}

function updateReceiptsForView(resetPage = false) {
  if (resetPage) activeReceiptsPage = 1;
  receiptsPagination.hidden = receiptsPageCount <= 1;
  showReceiptsPage(activeReceiptsPage);
}

if (receiptsPageCount > 1) {
  receiptsPagination.hidden = false;
  for (let page = 1; page <= receiptsPageCount; page += 1) {
    const pageButton = document.createElement('button');
    pageButton.type = 'button';
    pageButton.dataset.receiptsPage = String(page);
    pageButton.textContent = String(page);
    pageButton.addEventListener('click', () => showReceiptsPage(page));
    receiptsPagination.append(pageButton);
  }
  const nextButton = document.createElement('button');
  nextButton.className = 'receipts-next';
  nextButton.type = 'button';
  nextButton.append('Дальше');
  const nextIcon = document.createElement('img');
  nextIcon.src = './assets/icons/arrow-c-right.svg';
  nextIcon.alt = '';
  nextButton.append(nextIcon);
  nextButton.addEventListener('click', () => showReceiptsPage(activeReceiptsPage + 1));
  receiptsPagination.append(nextButton);
}

showReceiptsPage(1);

function openReceiptDetail(row) {
  row.classList.remove('unread-document');
  lastOpenedReceiptRow = row;
  receiptDetailNumber.textContent = row.querySelector(':scope > div:first-child strong').textContent.trim();
  const assignmentRow = receiptAssignmentRows.get(row);
  const assignmentNumber = assignmentRow?.querySelector('.invoice-cell strong').textContent.trim() || '';
  receiptDetailOrder.textContent = assignmentNumber;
  receiptDetailOrder.dataset.assignmentNumber = assignmentNumber;
  assignmentDetailView.hidden = true;
  applicationDetailView.hidden = true;
  invoiceDetailView.hidden = true;
  document.querySelector('.page-header').hidden = true;
  document.querySelector('.workspace').hidden = true;
  receiptDetailView.hidden = false;
  window.scrollTo(0, 0);
}

receiptRows.forEach((row) => {
  const number = row.querySelector(':scope > div:first-child strong').textContent.trim();
  row.tabIndex = 0;
  row.setAttribute('role', 'button');
  row.setAttribute('aria-label', `Открыть экспедиторскую расписку ${number}`);
  row.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    openReceiptDetail(row);
  });
  row.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openReceiptDetail(row);
    }
  });
});

receiptDetailBack.addEventListener('click', () => {
  receiptDetailView.hidden = true;
  document.querySelector('.page-header').hidden = false;
  document.querySelector('.workspace').hidden = false;
  document.querySelector('#receiptsTab').focus();
});

let lastOpenedReceiptRow = null;

receiptDetailOrder.addEventListener('click', (event) => {
  event.preventDefault();
  const assignmentRow = receiptAssignmentRows.get(lastOpenedReceiptRow);
  if (assignmentRow) openAssignmentDetail(assignmentRow, lastOpenedReceiptRow);
});

let lastOpenedAssignmentRow = null;

function getDocumentRowStatus(row) {
  const status = row.querySelector('.invoice-cell .invoice-row-status, .invoice-cell .draft-label');
  if (!status) return '';
  return [...status.childNodes]
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function openAssignmentDetail(row, returnTarget = row) {
  row.classList.remove('unread-document');
  updateAssignmentChipCounters();
  lastOpenedAssignmentRow = returnTarget;
  assignmentDetailNumber.textContent = row.querySelector('.invoice-cell strong').textContent.trim();
  const assignmentRowStatus = getDocumentRowStatus(row);
  assignmentDetailStatus.textContent = assignmentRowStatus;
  assignmentDetailStatus.classList.remove('application-status-waiting', 'application-status-error');
  assignmentDetailStatus.hidden = !assignmentRowStatus;
  receiptDetailView.hidden = true;
  applicationDetailView.hidden = true;
  invoiceDetailView.hidden = true;
  document.querySelector('.page-header').hidden = true;
  document.querySelector('.workspace').hidden = true;
  assignmentDetailView.hidden = false;
  window.scrollTo(0, 0);
}

assignmentRows.forEach((row) => {
  const number = row.querySelector('.invoice-cell strong').textContent.trim();
  row.setAttribute('role', 'button');
  row.setAttribute('aria-label', `Открыть поручение экспедитору ${number}`);
  row.addEventListener('click', (event) => {
    if (event.target.closest('.progress') || event.target.closest('.row-check') || event.target.closest('.row-actions')) return;
    openAssignmentDetail(row);
  });
  row.addEventListener('keydown', (event) => {
    if (event.target !== row) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openAssignmentDetail(row);
    }
  });
});

assignmentDetailBack.addEventListener('click', () => {
  assignmentDetailView.hidden = true;
  document.querySelector('.page-header').hidden = false;
  document.querySelector('.workspace').hidden = false;
  if (lastOpenedAssignmentRow) lastOpenedAssignmentRow.focus();
});

let lastOpenedApplicationRow = null;

function openApplicationDetail(row) {
  row.classList.remove('unread-document');
  updateApplicationChipCounters();
  const invoiceCell = row.querySelector('.invoice-cell');
  const number = invoiceCell.querySelector('strong').textContent.trim();
  const carrier = invoiceCell.nextElementSibling?.querySelector('strong')?.textContent.trim() || 'ООО «Глобал Логистик»';
  lastOpenedApplicationRow = row;
  applicationDetailNumber.textContent = number;
  applicationInfoNumber.textContent = number;
  applicationInfoDate.textContent = normalizeDetailDate(invoiceCell.querySelector('.muted')?.textContent || '05.08');
  applicationCarrierName.textContent = carrier;
  const isSignatureError = row.dataset.status === 'error';
  const isCounterpartyApplication = row.dataset.status === 'carrier-signature';
  const isCompletedApplication = row.dataset.status === 'completed';
  const isRejectedApplication = row.dataset.status === 'rejected';
  const isArchiveFinalApplication = isCompletedApplication || isRejectedApplication;
  const isReadOnlyApplication = isCounterpartyApplication || isArchiveFinalApplication;
  const applicationRowStatus = getDocumentRowStatus(row);
  applicationPrimaryAction.textContent = isSignatureError ? 'Подписать снова' : 'Подписать';
  applicationPrimaryAction.hidden = isReadOnlyApplication;
  applicationEditAction.hidden = isSignatureError || isReadOnlyApplication;
  applicationDetailStatus.textContent = applicationRowStatus;
  applicationDetailStatus.classList.remove('application-status-waiting', 'application-status-error');
  applicationDetailStatus.hidden = !applicationRowStatus;
  applicationCompletedTabs.forEach((tab) => { tab.hidden = !isArchiveFinalApplication; });
  receiptDetailView.hidden = true;
  assignmentDetailView.hidden = true;
  invoiceDetailView.hidden = true;
  document.querySelector('.page-header').hidden = true;
  document.querySelector('.workspace').hidden = true;
  applicationDetailView.hidden = false;
  window.scrollTo(0, 0);
}

function closeApplicationDetail() {
  applicationDetailView.hidden = true;
  document.querySelector('.page-header').hidden = false;
  document.querySelector('.workspace').hidden = false;
  if (lastOpenedApplicationRow) lastOpenedApplicationRow.focus();
}

applicationDetailBack.addEventListener('click', closeApplicationDetail);
applicationDetailListBack.addEventListener('click', closeApplicationDetail);

let lastOpenedInvoiceRow = null;

function normalizeDetailDate(shortDate) {
  const value = shortDate.replace(/^от\s+/, '').trim();
  return `${value}.2026`;
}

function openInvoiceDetail(row) {
  row.classList.remove('unread-document');
  updateInvoiceChipCounters();
  const cells = [...row.children].filter((cell) => !cell.classList.contains('row-check') && !cell.classList.contains('row-actions'));
  const invoiceCell = row.querySelector('.invoice-cell');
  const senderCell = cells[1];
  const recipientCell = cells[2];
  const cargoCell = cells[3];
  const number = invoiceCell.querySelector('strong').textContent.trim();
  const invoiceRowStatus = getDocumentRowStatus(row);
  const progressSegments = [...invoiceCell.querySelector('.progress')?.children || []].filter((segment) => !segment.classList.contains('progress-tooltip'));
  const isCarrierSignature = progressSegments.some((segment, index) => segment.classList.contains('striped') && index > 0);
  const hasCarrierUnloadingSignature = progressSegments.some((segment, index) => segment.classList.contains('striped') && index === 3);
  const hasCompletedUnloadingPreparation = progressSegments.length >= 4
    && progressSegments.slice(0, 3).every((segment) => segment.classList.contains('solid-step'));
  const isDriverAtUnloading = ['Требует подписи водителя', 'Ожидает подписи водителя'].includes(invoiceRowStatus)
    && hasCompletedUnloadingPreparation
    && !progressSegments[3].classList.contains('striped');
  const isDriverAtSecondUnloading = isDriverAtUnloading && progressSegments.length === 5;
  const isWaitingForConsignee = invoiceRowStatus === 'Требует подписи грузополучателя';
  const isPartialCargo = invoiceRowStatus === 'Груз принят частично';
  const isRedirectRequired = invoiceRowStatus === 'Требуется переадресовка';
  const isRedirectInTransit = invoiceRowStatus === 'Переадресовка';
  const isPartialAcceptance = isPartialCargo || isRedirectRequired || isRedirectInTransit;
  const isArchiveMultiDelivery = row.dataset.archiveSection === 'completed' && row.dataset.archiveType === 'multi-delivery';
  const hasSecondUnloading = isDriverAtSecondUnloading || isArchiveMultiDelivery;
  const isAtUnloading = (row.dataset.status === 'unloading' && !isWaitingForConsignee) || hasCarrierUnloadingSignature || isDriverAtUnloading || isPartialAcceptance || isArchiveMultiDelivery;
  const isInTransit = (row.dataset.status === 'route' && !hasCarrierUnloadingSignature) || isWaitingForConsignee;
  const isTransportCost = row.dataset.status === 'transport-cost' && Boolean(row.closest('#rows'));
  const isReadyToSign = row.dataset.status === 'signature' && Boolean(row.closest('#rows'));
  const isSignatureError = row.dataset.status === 'error' && Boolean(row.closest('#rows'));
  const isDraft = Boolean(row.closest('#draftRows')) || row.dataset.status === 'draft';
  const isCompletedDelivery = row.dataset.archiveSection === 'completed' && row.dataset.status === 'delivery';
  const isCompletedTransportCost = row.dataset.archiveSection === 'completed' && row.dataset.status === 'transport-cost';
  const isCompletedInvoice = isCompletedDelivery || isCompletedTransportCost;
  const isCarrierRejection = row.dataset.archiveSection === 'rejected'
    && row.dataset.status === 'carrier-rejection'
    && !isPartialAcceptance
    && !isDriverAtSecondUnloading;
  const isRejectedTransportCost = row.dataset.archiveSection === 'rejected' && row.dataset.status === 'transport-cost';
  const isUnsignedStart = isReadyToSign || isDraft;
  const isCarrierAtUnloading = isAtUnloading && hasCarrierUnloadingSignature;
  const isRejectedAtUnloading = isAtUnloading && progressSegments.some((segment) => segment.dataset.tooltip?.includes('отказал'));
  const hasCompletedLoading = isInTransit || isAtUnloading || isTransportCost || isCompletedInvoice || isRejectedTransportCost;

  lastOpenedInvoiceRow = row;
  invoiceDetailNumber.textContent = number;
  invoiceDetailStatus.textContent = invoiceRowStatus;
  invoiceDetailStatus.hidden = !invoiceRowStatus;
  invoiceInfoNumber.textContent = number;
  invoiceInfoDate.textContent = normalizeDetailDate(invoiceCell.querySelector('.muted')?.textContent || '23.07');
  invoiceSenderName.textContent = senderCell?.querySelector('strong')?.textContent.trim() || (isDraft ? '' : 'ООО «Хендэ Мотор СНГ»');
  invoiceSenderContact.textContent = senderCell?.querySelector('.muted')?.innerText.trim().split('\n')[0] || (isDraft ? '' : '+79006667766');
  invoiceRecipientName.textContent = recipientCell?.querySelector('strong')?.textContent.trim() || (isDraft ? '' : 'ООО «Инжиниринг Сервис»');
  invoiceRecipientAddress.textContent = recipientCell?.querySelector('.muted')?.textContent.trim() || (isDraft ? '' : 'Россия, 620000, г. Екатеринбург');
  invoiceCargoName.textContent = cargoCell?.querySelector('strong')?.textContent.trim() || (isDraft ? '' : 'Холодильное оборудование');
  invoiceSenderSignature.classList.toggle('is-muted', isUnsignedStart);
  invoiceSenderIcon.src = isSignatureError ? './assets/icons/cert-rosette-red.svg' : './assets/icons/cert-rosette.svg';
  invoiceSenderSigner.hidden = isUnsignedStart;
  invoiceSenderSigner.textContent = isWaitingForConsignee ? 'Автотестов И. К.' : 'Маслов В. В.';
  invoiceDriverName.hidden = isWaitingForConsignee || !(isCarrierSignature || hasCompletedLoading || isCarrierRejection);
  invoiceCarrierSigner.hidden = !(hasCompletedLoading || isCarrierRejection);
  invoiceCarrierSigner.textContent = isWaitingForConsignee ? 'Автотестов И. К.' : 'Корнилов Д. А.';
  invoiceCarrierSignature.classList.toggle('is-muted', !(hasCompletedLoading || isCarrierRejection));
  invoiceCarrierIcon.src = isCarrierRejection ? './assets/icons/cert-rosette-red.svg' : './assets/icons/cert-rosette.svg';
  invoiceLoadingComment.hidden = !isCarrierRejection;
  invoiceQrSignature.classList.toggle('is-muted', !hasCompletedLoading);
  invoiceQrLabel.textContent = hasCompletedLoading ? 'QR-код получен' : 'QR-код';
  invoiceLoadingStep.classList.toggle('passed', isAtUnloading || isTransportCost || isCompletedInvoice || isRejectedTransportCost);
  invoiceCreatedStep.classList.toggle('rejected', isCarrierRejection);
  invoiceLoadingStep.classList.toggle('error', isSignatureError || isCarrierRejection);
  invoiceLoadingTitle.textContent = isSignatureError || isCarrierRejection ? 'До рейса' : 'Погрузка';
  const loadingToggle = document.querySelector('#invoiceLoadingToggle');
  const loadingSignatures = document.querySelector('#invoiceLoadingSignatures');
  const isLoadingExpanded = isPartialAcceptance || !(isAtUnloading || isTransportCost || isCompletedInvoice || isRejectedTransportCost);
  loadingToggle.setAttribute('aria-expanded', String(isLoadingExpanded));
  loadingToggle.querySelector('.invoice-timeline-chevron').classList.toggle('expanded', isLoadingExpanded);
  loadingSignatures.hidden = !isLoadingExpanded;
  invoiceUnloadingStep.classList.toggle('completed', isAtUnloading || isTransportCost || isCompletedInvoice || isRejectedTransportCost);
  invoiceUnloadingStep.classList.toggle('passed', (isTransportCost || isCompletedInvoice) && !isArchiveMultiDelivery);
  invoiceUnloadingStep.classList.toggle('rejected', isRejectedTransportCost);
  invoiceUnloadingStep.classList.remove('error');
  invoiceUnloadingStep.classList.toggle('warning', isPartialAcceptance || hasSecondUnloading);
  invoiceUnloadingStep.classList.toggle('commented', isCarrierAtUnloading || isDriverAtUnloading);
  invoiceUnloadingTitle.textContent = hasSecondUnloading ? 'Разгрузка 1' : 'Разгрузка';
  invoiceUnloadingToggle.setAttribute('aria-expanded', String(isAtUnloading));
  invoiceUnloadingChevron.hidden = !(isAtUnloading || isTransportCost);
  invoiceUnloadingChevron.classList.toggle('expanded', isAtUnloading);
  invoiceUnloadingSectionLink.hidden = !isDriverAtUnloading;
  invoiceUnloadingSignatures.hidden = !isAtUnloading;
  invoiceUnloadingComment.hidden = isRejectedAtUnloading;
  invoiceUnloadingComment.textContent = isPartialAcceptance || hasSecondUnloading
    ? 'Часть груза повреждена'
    : isCarrierAtUnloading || isDriverAtUnloading
      ? 'Груз принят, повреждений не имеет'
      : 'Груз и упаковка не повреждены';
  invoiceUnloadingRecipientSigner.textContent = hasSecondUnloading
    ? 'Петров Е. О.'
    : isCarrierAtUnloading || isDriverAtUnloading
      ? 'Тестовый Л. С.'
      : 'Петров Е. О.';
  const hasSignedUnloadingDriver = isCarrierAtUnloading || isRedirectRequired || hasSecondUnloading;
  invoiceUnloadingDriver.classList.toggle('is-muted', !hasSignedUnloadingDriver);
  invoiceUnloadingDriverName.hidden = !hasSignedUnloadingDriver;
  invoiceUnloadingDriverName.textContent = isRedirectRequired || hasSecondUnloading ? 'Иванкова Г. Т.' : 'Сташек Светлана Дмитриевна';
  invoiceUnloadingCarrier.classList.toggle('is-muted', !(isRedirectRequired || hasSecondUnloading));
  invoiceUnloadingCarrierSigner.hidden = !(isRedirectRequired || hasSecondUnloading);
  invoiceSecondUnloadingStep.hidden = !hasSecondUnloading;
  invoiceSecondUnloadingStep.classList.toggle('completed', hasSecondUnloading);
  invoiceSecondUnloadingStep.classList.remove('passed');
  invoiceSecondUnloadingStep.classList.toggle('commented', hasSecondUnloading);
  invoiceSecondUnloadingToggle.setAttribute('aria-expanded', String(hasSecondUnloading));
  invoiceSecondUnloadingChevron.classList.toggle('expanded', hasSecondUnloading);
  invoiceSecondUnloadingSignatures.hidden = !hasSecondUnloading;
  invoiceCostStep.hidden = !(isTransportCost || isCompletedTransportCost || isRejectedTransportCost);
  invoiceCostStep.classList.toggle('error', isRejectedTransportCost);
  invoiceCostStep.classList.toggle('passed', isCompletedTransportCost || isRejectedTransportCost);
  invoiceCompleteStep.classList.toggle('completed', isCompletedInvoice || isRejectedTransportCost);
  invoiceCostToggle.setAttribute('aria-expanded', String(isTransportCost));
  invoiceCostChevron.hidden = false;
  invoiceCostChevron.classList.toggle('expanded', isTransportCost);
  invoiceCostSignatures.hidden = !isTransportCost;
  invoiceCostSenderSignature.classList.toggle('is-muted', !(isCompletedTransportCost || isRejectedTransportCost));
  invoiceCostSenderIcon.src = isRejectedTransportCost ? './assets/icons/cert-rosette-red.svg' : './assets/icons/cert-rosette.svg';
  invoiceCostSenderSigner.hidden = !(isCompletedTransportCost || isRejectedTransportCost);
  invoiceStatusActions.hidden = !(isTransportCost || isReadyToSign || isSignatureError || isDraft);
  invoicePrimaryAction.textContent = isRedirectRequired ? 'Создать переадресовку' : isSignatureError ? 'Подписать снова' : 'Подписать';
  invoiceSecondaryAction.textContent = isReadyToSign || isDraft ? 'Отправить на подпись' : 'Отказать в подписи';
  invoiceSecondaryAction.hidden = isRedirectRequired || isSignatureError || isReadyToSign;
  invoiceTertiaryAction.hidden = !isDraft;
  invoiceStatusInfo.hidden = !isSignatureError;
  invoiceCostDetails.hidden = !(isTransportCost || isCompletedTransportCost || isRejectedTransportCost);
  invoiceCurrentStatusText.textContent = isCompletedInvoice || isRejectedTransportCost
    ? 'Перевозка завершена'
    : isCarrierRejection
    ? 'Перевозчик отказал в подписи. Документооборот завершен'
    : isSignatureError
    ? 'Подпись не прошла проверку'
    : isReadyToSign || isDraft
    ? 'Накладная готова к подписанию и отправке'
    : isTransportCost
    ? 'Перевозчик выставил титул стоимости'
    : isRedirectRequired
    ? 'Получатель принял груз частично. Требуется переадресовка'
    : isRedirectInTransit
    ? 'Машина в пути'
    : isInTransit
      ? 'Машина в пути'
      : isCarrierAtUnloading || isCarrierSignature
        ? 'Ожидает подписи перевозчика'
        : 'Ожидает подписи водителя';

  const createdToggle = document.querySelector('#invoiceCreatedToggle');
  createdToggle.setAttribute('aria-expanded', 'false');
  createdToggle.querySelector('.invoice-timeline-chevron').classList.remove('expanded');
  document.querySelector('#invoiceCreatedSignature').hidden = true;

  receiptDetailView.hidden = true;
  assignmentDetailView.hidden = true;
  applicationDetailView.hidden = true;
  document.querySelector('.page-header').hidden = true;
  document.querySelector('.workspace').hidden = true;
  invoiceDetailView.hidden = false;
  window.scrollTo(0, 0);
}

invoiceDetailBack.addEventListener('click', () => {
  invoiceDetailView.hidden = true;
  document.querySelector('.page-header').hidden = false;
  document.querySelector('.workspace').hidden = false;
  if (lastOpenedInvoiceRow) lastOpenedInvoiceRow.focus();
});

document.querySelector('#invoiceLoadingToggle').addEventListener('click', (event) => {
  const signatures = document.querySelector('#invoiceLoadingSignatures');
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  event.currentTarget.querySelector('.invoice-timeline-chevron').classList.toggle('expanded', !expanded);
  signatures.hidden = expanded;
});

document.querySelector('#invoiceCreatedToggle').addEventListener('click', (event) => {
  const signature = document.querySelector('#invoiceCreatedSignature');
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  event.currentTarget.querySelector('.invoice-timeline-chevron').classList.toggle('expanded', !expanded);
  signature.hidden = expanded;
});

invoiceUnloadingToggle.addEventListener('click', (event) => {
  if (invoiceUnloadingChevron.hidden) return;
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  invoiceUnloadingChevron.classList.toggle('expanded', !expanded);
  invoiceUnloadingSignatures.hidden = expanded;
});

invoiceSecondUnloadingToggle.addEventListener('click', (event) => {
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  invoiceSecondUnloadingChevron.classList.toggle('expanded', !expanded);
  invoiceSecondUnloadingSignatures.hidden = expanded;
});

invoiceCostToggle.addEventListener('click', (event) => {
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  event.currentTarget.querySelector('.invoice-timeline-chevron').classList.toggle('expanded', !expanded);
  invoiceCostSignatures.hidden = expanded;
});

function hasInvoiceDetailForRow(row) {
  if (row.dataset.archiveSection === 'completed' && (row.dataset.status === 'delivery' || row.dataset.status === 'transport-cost')) return true;
  if (row.dataset.archiveSection === 'rejected' && (row.dataset.status === 'carrier-rejection' || row.dataset.status === 'transport-cost')) return true;
  if (row.closest('#draftRows') || row.dataset.status === 'draft') return true;
  if (row.dataset.status === 'loading' || row.dataset.status === 'route') return true;
  if (row.dataset.status === 'transport-cost') return Boolean(row.closest('#rows'));
  if (row.dataset.status === 'signature') return Boolean(row.closest('#rows'));
  if (row.dataset.status === 'error') return Boolean(row.closest('#rows'));
  return row.dataset.status === 'unloading';
}

function canOpenDocumentRow(row) {
  if (row.classList.contains('receipt-row') || row.classList.contains('assignment-row')) return true;
  if (row.closest('#applicationRows, #counterpartyApplicationRows, #draftApplicationRows, #archiveApplicationRows')) return true;
  return hasInvoiceDetailForRow(row);
}

function selectRandomUnreadDocuments(groupRows) {
  const candidates = [...new Set(groupRows)].filter((row) => canOpenDocumentRow(row)
    && !row.classList.contains('draft-row')
    && !row.classList.contains('draft-assignment-row')
    && row.dataset.status !== 'draft'
    && row.dataset.status !== 'assignment-draft');
  const count = Math.min(candidates.length, candidates.length > 4 ? 2 : 1);
  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [candidates[index], candidates[randomIndex]] = [candidates[randomIndex], candidates[index]];
  }
  candidates.slice(0, count).forEach((row) => row.classList.add('unread-document'));
}

function updateInvoiceChipCounters() {
  const requiresRows = [...rowGroups.requires.querySelectorAll('.table-row')];
  const counterpartyRows = [...rowGroups.counterparty.querySelectorAll('.table-row')];
  const rejectedRows = [...rowGroups.archive.querySelectorAll('.table-row[data-archive-section="rejected"]')];
  const countUnread = (rows) => rows.filter((row) => row.classList.contains('unread-document')).length;
  const counts = {
    all: countUnread([...requiresRows, ...counterpartyRows, ...rejectedRows]),
    shipper: countUnread(requiresRows),
    carrier: countUnread(counterpartyRows.filter((row) => row.dataset.status !== 'unloading')),
    consignee: countUnread(counterpartyRows.filter((row) => row.dataset.status === 'unloading')),
    rejected: countUnread(rejectedRows),
  };

  invoicePartyChipButtons.forEach((chip) => {
    const count = counts[chip.dataset.invoiceChip] || 0;
    let counter = chip.querySelector('.chip-counter');
    if (!count) {
      counter?.remove();
      return;
    }
    if (!counter) {
      counter = document.createElement('span');
      counter.className = 'chip-counter';
      chip.append(counter);
    }
    counter.textContent = String(count);
  });
}

function updateApplicationChipCounters() {
  const requiresRows = [...applicationRowGroups.requires.querySelectorAll('.table-row:not(.all-application-row)')];
  const counterpartyRows = [...applicationRowGroups.counterparty.querySelectorAll('.table-row:not(.all-application-row)')];
  const rejectedRows = [...applicationRowGroups.archive.querySelectorAll('.table-row[data-archive-section="rejected"]')];
  const countUnread = (rows) => rows.filter((row) => row.classList.contains('unread-document')).length;
  const counts = {
    all: countUnread([...requiresRows, ...counterpartyRows, ...rejectedRows]),
    shipper: countUnread(requiresRows),
    carrier: countUnread(counterpartyRows),
    rejected: countUnread(rejectedRows),
  };

  applicationPartyChipButtons.forEach((chip) => {
    const count = counts[chip.dataset.applicationChip] || 0;
    let counter = chip.querySelector('.chip-counter');
    if (!count) {
      counter?.remove();
      return;
    }
    if (!counter) {
      counter = document.createElement('span');
      counter.className = 'chip-counter';
      chip.append(counter);
    }
    counter.textContent = String(count);
  });
}

function updateAssignmentChipCounters() {
  const shipperRows = requiresAssignmentRows;
  const forwarderRows = counterpartyAssignmentRows;
  const countUnread = (rows) => rows.filter((row) => row.classList.contains('unread-document')).length;
  const counts = {
    all: countUnread([...shipperRows, ...forwarderRows]),
    shipper: countUnread(shipperRows),
    forwarder: countUnread(forwarderRows),
  };

  assignmentPartyChipButtons.forEach((chip) => {
    const count = counts[chip.dataset.assignmentChip] || 0;
    let counter = chip.querySelector('.chip-counter');
    if (!count) {
      counter?.remove();
      return;
    }
    if (!counter) {
      counter = document.createElement('span');
      counter.className = 'chip-counter';
      chip.append(counter);
    }
    counter.textContent = String(count);
  });
}

function initializeUnreadDocuments() {
  [
    '#rows > .table-row',
    '#counterpartyRows > .table-row',
    '#applicationRows > .table-row',
    '#counterpartyApplicationRows > .table-row',
    '#assignmentsView .assignment-row:not([data-status="assignment-carrier"]):not(.all-assignment-row)',
    '#assignmentsView .assignment-row[data-status="assignment-carrier"]',
  ].forEach((selector) => selectRandomUnreadDocuments(document.querySelectorAll(selector)));

  ['completed', 'rejected', 'trash', 'all'].forEach((section) => {
    selectRandomUnreadDocuments(document.querySelectorAll(`#archiveRows > [data-archive-section="${section}"]`));
    selectRandomUnreadDocuments(document.querySelectorAll(`#archiveApplicationRows > [data-archive-section="${section}"]`));
    selectRandomUnreadDocuments(document.querySelectorAll(`#archiveAssignmentsView [data-archive-section="${section}"]`));
  });

  selectRandomUnreadDocuments(receiptRows);
}

initializeUnreadDocuments();
updateInvoiceChipCounters();
updateApplicationChipCounters();
updateAssignmentChipCounters();

document.querySelectorAll('.forwarding-order[href="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const receiptRow = link.closest('.receipt-row');
    const assignmentRow = receiptAssignmentRows.get(receiptRow);
    if (assignmentRow) openAssignmentDetail(assignmentRow, receiptRow);
  });
});

rows.forEach((row) => row.addEventListener('click', (event) => {
  if (event.target.closest('.progress') || event.target.closest('.row-check') || event.target.closest('.row-actions')) return;
  if (activeDocumentTab === 'assignments') return;
  if (activeDocumentTab === 'applications' && (row.dataset.status === 'waiting' || row.dataset.status === 'error' || row.dataset.status === 'carrier-signature' || row.dataset.status === 'completed' || row.dataset.status === 'rejected' || row.dataset.status === 'draft' || row.classList.contains('draft-row'))) {
    openApplicationDetail(row);
    return;
  }
  if (activeDocumentTab === 'invoices' && hasInvoiceDetailForRow(row)) {
    openInvoiceDetail(row);
    return;
  }
  showToast(activeDocumentTab === 'applications' ? 'Открытие заявки будет подключено в следующем шаге' : 'Открытие накладной будет подключено в следующем шаге');
}));

rows.forEach((row) => row.addEventListener('keydown', (event) => {
  if (event.target !== row) return;
  if (event.key === 'Enter' || event.key === ' ') {
    if (activeDocumentTab === 'applications' && (row.dataset.status === 'waiting' || row.dataset.status === 'error' || row.dataset.status === 'carrier-signature' || row.dataset.status === 'completed' || row.dataset.status === 'rejected' || row.dataset.status === 'draft' || row.classList.contains('draft-row'))) {
      event.preventDefault();
      openApplicationDetail(row);
      return;
    }
    if (activeDocumentTab !== 'invoices' || !hasInvoiceDetailForRow(row)) return;
    event.preventDefault();
    openInvoiceDetail(row);
  }
}));

document.querySelectorAll('.row-actions').forEach((button) => {
  button.addEventListener('click', () => showToast('Меню действий будет добавлено позже'));
});

rows.forEach((row) => {
  row.querySelector('.row-checkbox').addEventListener('change', (event) => {
    row.classList.toggle('selected-row', event.target.checked);
    syncSelectAll();
  });
});

['#selectAll', '#applicationSelectAll', '#assignmentSelectAll', '#counterpartyAssignmentSelectAll', '#draftAssignmentSelectAll', '#archiveAssignmentSelectAll'].forEach((selector) => {
  document.querySelector(selector).addEventListener('change', (event) => {
    getActiveRows().forEach((row) => {
      row.classList.toggle('selected-row', event.target.checked);
      row.querySelector('.row-checkbox').checked = event.target.checked;
    });
    event.target.indeterminate = false;
    showToast(event.target.checked ? 'Выбраны все документы' : 'Выбор снят');
  });
});

helpButton.addEventListener('click', () => {
  helpPopover.hidden = !helpPopover.hidden;
});

document.querySelector('#brandLogo').addEventListener('click', () => {
  window.location.reload();
});

updateInvoiceStatusOptions();
[senderFilter, recipientFilter, customerFilter, carrierFilter, applicationCarrierFilter, applicationSupplyPointFilter, statusFilter, assignmentForwarderFilter, assignmentShipperFilter, assignmentTopStatusFilter].forEach(enhanceFilterSelect);
updateFilterPanelFields();
populateFilterOptions();
assignmentsTab.click();
activeAssignmentChip = 'all';
document.querySelector('#workingAllNav').click();
