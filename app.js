const STORAGE_KEY = "language-teaching-assistant-v3";
const LEGACY_STORAGE_KEYS = ["language-teaching-assistant-v2", "language-teaching-assistant-v1"];
const MATERIAL_SERIES = Array.from({ length: 15 }, (_, index) => `C${index + 6}`);
const MODULE_PARTS = {
  listening: ["Part1", "Part2", "Part3", "Part4"],
  reading: ["Passage1", "Passage2", "Passage3"],
  "external-reading": ["经济商业", "科技社会", "教育心理", "文化历史", "环境健康"],
};
const EXAM_CONFIG = {
  IELTS: ["5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0"],
  TOEFL: ["80", "90", "100", "110"],
  PTE: ["58", "65", "72", "79"],
  DET: ["105", "115", "125", "135"],
};
const FOUNDATION_OPTIONS = ["零基础", "薄弱", "中等", "较稳", "冲分"];
const COURSE_MODE_OPTIONS = ["雅思1v1", "雅思班课"];
const COURSE_PRODUCTS = {
  "雅思1v1": [
    { value: "雅思1v1", label: "（旧产品）雅思1v1", hours: "" },
    { value: "雅思1v1-15课时", label: "雅思1v1-15课时", hours: "15" },
    { value: "雅思1v1-30课时", label: "雅思1v1-30课时", hours: "30" },
    { value: "雅思1v1-50课时", label: "雅思1v1-50课时", hours: "50" },
  ],
  雅思班课: [
    { value: "雅思脱产班（春季）", label: "雅思脱产班（春季）", hours: "80" },
    { value: "雅思脱产班（秋季）", label: "雅思脱产班（秋季）", hours: "80" },
    { value: "雅思强化班-常规开设", label: "雅思强化班-常规开设", hours: "40" },
  ],
};
const LESSON_TAGS = [
  { id: "close-listening", label: "精听", group: "听力" },
  { id: "listening-locating", label: "听力定位", group: "听力" },
  { id: "synonyms", label: "同义替换", group: "听力" },
  { id: "listening-choices", label: "选择题训练", group: "听力" },
  { id: "listening-blanks", label: "填空题训练", group: "听力" },
  { id: "reading-locating", label: "阅读定位", group: "阅读" },
  { id: "external-intensive", label: "外刊精读", group: "阅读" },
  { id: "long-sentence", label: "长难句", group: "阅读" },
  { id: "heading-match", label: "段落匹配", group: "阅读" },
  { id: "true-false", label: "判断题", group: "阅读" },
  { id: "task1-review", label: "Task1讲评", group: "写作" },
  { id: "task2-planning", label: "Task2审题", group: "写作" },
  { id: "essay-feedback", label: "作文批改", group: "写作" },
  { id: "model-essay", label: "范文拆解", group: "写作" },
  { id: "speaking-topics", label: "话题素材", group: "口语" },
  { id: "part2-expand", label: "Part2扩展", group: "口语" },
  { id: "part3-followup", label: "Part3追问", group: "口语" },
  { id: "error-review", label: "错题复盘", group: "复盘" },
  { id: "timed-drill", label: "限时训练", group: "复盘" },
  { id: "homework-review", label: "作业讲评", group: "复盘" },
];
const WRITING_TASK_TYPES = {
  task1: ["线图", "柱状图", "饼图", "表格", "地图", "流程图", "混合图"],
  task2: ["同意与否", "双边讨论", "优缺点", "问题解决", "原因影响", "双问题", "报告类"],
};

const state = loadState();
const draftRecord = {
  lessonTags: [],
  completedMaterials: [],
  assignedMaterials: [],
  writingTask1Types: [],
  writingTask2Types: [],
};
let activeTab = "dashboard";

const els = {
  summaryGrid: document.getElementById("summaryGrid"),
  monthPicker: document.getElementById("monthPicker"),
  monthlyHours: document.getElementById("monthlyHours"),
  teacherOverviewPanel: document.getElementById("teacherOverviewPanel"),
  rewardPanel: document.getElementById("rewardPanel"),
  followUpList: document.getElementById("followUpList"),
  memoInput: document.getElementById("memoInput"),
  saveMemoBtn: document.getElementById("saveMemoBtn"),
  weekNoteInput: document.getElementById("weekNoteInput"),
  saveWeekNoteBtn: document.getElementById("saveWeekNoteBtn"),
  todoInput: document.getElementById("todoInput"),
  saveTodoBtn: document.getElementById("saveTodoBtn"),
  dashboardWeekPanel: document.getElementById("dashboardWeekPanel"),
  studentForm: document.getElementById("studentForm"),
  studentId: document.getElementById("studentId"),
  studentName: document.getElementById("studentName"),
  studentExam: document.getElementById("studentExam"),
  studentExamPicker: document.getElementById("studentExamPicker"),
  studentFoundation: document.getElementById("studentFoundation"),
  studentFoundationPicker: document.getElementById("studentFoundationPicker"),
  studentFoundationScore: document.getElementById("studentFoundationScore"),
  studentTarget: document.getElementById("studentTarget"),
  studentTargetRange: document.getElementById("studentTargetRange"),
  studentTargetDisplay: document.getElementById("studentTargetDisplay"),
  studentTargetTicks: document.getElementById("studentTargetTicks"),
  studentExamDate: document.getElementById("studentExamDate"),
  studentCourseMode: document.getElementById("studentCourseMode"),
  studentCourseModePicker: document.getElementById("studentCourseModePicker"),
  studentPackageHours: document.getElementById("studentPackageHours"),
  studentPackagePlan: document.getElementById("studentPackagePlan"),
  studentAssistant: document.getElementById("studentAssistant"),
  studentNotes: document.getElementById("studentNotes"),
  studentExcelInput: document.getElementById("studentExcelInput"),
  resetStudentBtn: document.getElementById("resetStudentBtn"),
  studentList: document.getElementById("studentList"),
  recordForm: document.getElementById("recordForm"),
  recordId: document.getElementById("recordId"),
  recordStudent: document.getElementById("recordStudent"),
  recordDate: document.getElementById("recordDate"),
  recordDuration: document.getElementById("recordDuration"),
  recordStatus: document.getElementById("recordStatus"),
  recordStartTime: document.getElementById("recordStartTime"),
  recordEndTime: document.getElementById("recordEndTime"),
  recordDurationDisplay: document.getElementById("recordDurationDisplay"),
  recordTimeWeightBar: document.getElementById("recordTimeWeightBar"),
  recordHomeworkCompletion: document.getElementById("recordHomeworkCompletion"),
  recordHomeworkNote: document.getElementById("recordHomeworkNote"),
  writingTask1Picker: document.getElementById("writingTask1Picker"),
  writingTask2Picker: document.getElementById("writingTask2Picker"),
  recordWritingNote: document.getElementById("recordWritingNote"),
  recordNotes: document.getElementById("recordNotes"),
  lessonTagPicker: document.getElementById("lessonTagPicker"),
  customLessonTagInput: document.getElementById("customLessonTagInput"),
  addCustomLessonTagBtn: document.getElementById("addCustomLessonTagBtn"),
  builderModule: document.getElementById("builderModule"),
  builderSeries: document.getElementById("builderSeries"),
  builderTest: document.getElementById("builderTest"),
  builderPartPicker: document.getElementById("builderPartPicker"),
  addCompletedMaterialsBtn: document.getElementById("addCompletedMaterialsBtn"),
  addAssignedMaterialsBtn: document.getElementById("addAssignedMaterialsBtn"),
  completedPreview: document.getElementById("completedPreview"),
  assignedPreview: document.getElementById("assignedPreview"),
  recordSuggestionBox: document.getElementById("recordSuggestionBox"),
  resetRecordBtn: document.getElementById("resetRecordBtn"),
  recordList: document.getElementById("recordList"),
  trackerStudent: document.getElementById("trackerStudent"),
  trackerModule: document.getElementById("trackerModule"),
  trackerSeries: document.getElementById("trackerSeries"),
  trackerSummary: document.getElementById("trackerSummary"),
  trackerSuggestions: document.getElementById("trackerSuggestions"),
  pendingMaterials: document.getElementById("pendingMaterials"),
  completedMaterials: document.getElementById("completedMaterials"),
  trackerCatalog: document.getElementById("trackerCatalog"),
  quickActions: document.querySelector(".quick-actions"),
  scheduleAnchorDate: document.getElementById("scheduleAnchorDate"),
  scheduleTodayBtn: document.getElementById("scheduleTodayBtn"),
  scheduleWeekRange: document.getElementById("scheduleWeekRange"),
  scheduleWeekHeader: document.getElementById("scheduleWeekHeader"),
  scheduleBoard: document.getElementById("scheduleBoard"),
  scheduleAgenda: document.getElementById("scheduleAgenda"),
  exportBtn: document.getElementById("exportBtn"),
  importInput: document.getElementById("importInput"),
  seedDemoBtn: document.getElementById("seedDemoBtn"),
};

init();

function init() {
  syncUiState();
  bindEvents();
  renderStudentOptions();
  renderSeriesOptions();
  renderStudentControls();
  resetRecordForm();
  renderAll();
}

function syncUiState() {
  if (!state.ui.selectedMonth) {
    state.ui.selectedMonth = todayMonth();
  }
  if (!state.ui.scheduleAnchorDate) {
    state.ui.scheduleAnchorDate = today();
  }
  if (!state.ui.selectedScheduleDate) {
    state.ui.selectedScheduleDate = state.ui.scheduleAnchorDate;
  }
  if (!state.ui.selectedStudentId && state.students[0]) {
    state.ui.selectedStudentId = state.students[0].id;
  }
  if (!state.ui.trackerStudentId && state.students[0]) {
    state.ui.trackerStudentId = state.students[0].id;
  }
  if (!state.ui.trackerSeries) {
    state.ui.trackerSeries = "all";
  }
}

function bindEvents() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  els.monthPicker.addEventListener("change", (event) => {
    state.ui.selectedMonth = event.target.value;
    persist();
    renderSummary();
    renderDashboard();
  });

  els.studentForm.addEventListener("submit", handleStudentSubmit);
  els.resetStudentBtn.addEventListener("click", resetStudentForm);
  els.studentExamPicker.addEventListener("click", handleExamSelection);
  els.studentFoundationPicker.addEventListener("click", handleFoundationSelection);
  els.studentCourseModePicker.addEventListener("click", handleCourseModeSelection);
  els.studentTargetRange.addEventListener("input", syncStudentTargetDisplay);
  els.studentPackagePlan.addEventListener("change", () => syncCourseProductDisplay(true));
  els.studentPackageHours.addEventListener("input", () => {
    els.studentPackageHours.value = normalizePackageHoursInput(els.studentPackageHours.value);
  });
  els.studentExcelInput.addEventListener("change", importStudentsFromSpreadsheet);

  els.recordForm.addEventListener("submit", handleRecordSubmit);
  els.resetRecordBtn.addEventListener("click", resetRecordForm);
  els.recordStartTime.addEventListener("input", syncRecordTimeSection);
  els.recordEndTime.addEventListener("input", syncRecordTimeSection);
  els.recordStudent.addEventListener("change", () => {
    state.ui.selectedStudentId = els.recordStudent.value;
    persist();
    renderDashboard();
    renderRecordSuggestions();
  });
  els.builderModule.addEventListener("change", () => {
    renderBuilderPartPicker();
    renderRecordSuggestions();
  });
  els.builderSeries.addEventListener("change", renderBuilderPartPicker);
  els.builderTest.addEventListener("change", renderBuilderPartPicker);
  els.addCompletedMaterialsBtn.addEventListener("click", () => addBuilderSelectionToDraft("completed"));
  els.addAssignedMaterialsBtn.addEventListener("click", () => addBuilderSelectionToDraft("assigned"));

  els.lessonTagPicker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tag-id]");
    if (!button) {
      return;
    }
    toggleLessonTag(button.dataset.tagId);
  });
  els.addCustomLessonTagBtn.addEventListener("click", addCustomLessonTag);
  els.customLessonTagInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomLessonTag();
    }
  });

  [els.writingTask1Picker, els.writingTask2Picker].forEach((container) => {
    container.addEventListener("click", (event) => {
      const button = event.target.closest("[data-writing-type]");
      if (!button) {
        return;
      }
      toggleWritingType(button.dataset.task, button.dataset.writingType);
    });
  });

  els.builderPartPicker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-part]");
    if (!button) {
      return;
    }
    button.classList.toggle("is-active");
  });

  [els.completedPreview, els.assignedPreview].forEach((container) => {
    container.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-remove-code]");
      if (!removeButton) {
        return;
      }
      removeDraftMaterial(removeButton.dataset.list, removeButton.dataset.removeCode);
    });
  });

  els.trackerStudent.addEventListener("change", () => {
    state.ui.trackerStudentId = els.trackerStudent.value;
    persist();
    renderTracker();
  });
  els.trackerModule.addEventListener("change", renderTracker);
  els.trackerSeries.addEventListener("change", () => {
    state.ui.trackerSeries = els.trackerSeries.value;
    persist();
    renderTracker();
  });

  els.quickActions.addEventListener("click", handleQuickAction);

  els.scheduleAnchorDate.addEventListener("change", (event) => {
    state.ui.scheduleAnchorDate = normalizeScheduleAnchor(event.target.value);
    state.ui.selectedScheduleDate = state.ui.scheduleAnchorDate;
    persist();
    renderDashboardWeekPreview();
    renderSchedule();
  });
  els.scheduleTodayBtn.addEventListener("click", () => {
    state.ui.scheduleAnchorDate = today();
    state.ui.selectedScheduleDate = today();
    persist();
    renderDashboardWeekPreview();
    renderSchedule();
  });
  els.scheduleBoard.addEventListener("click", (event) => {
    const dayButton = event.target.closest("[data-schedule-date]");
    if (!dayButton) {
      return;
    }
    state.ui.selectedScheduleDate = dayButton.dataset.scheduleDate;
    persist();
    renderSchedule();
  });
  els.saveMemoBtn.addEventListener("click", saveMemo);
  els.saveWeekNoteBtn.addEventListener("click", saveDashboardNotes);
  els.saveTodoBtn.addEventListener("click", saveDashboardNotes);

  els.exportBtn.addEventListener("click", exportData);
  els.importInput.addEventListener("change", importData);
  els.seedDemoBtn.addEventListener("click", loadDemoData);
}

function renderAll() {
  renderSummary();
  renderStudentOptions();
  renderSeriesOptions();
  renderStudentControls();
  renderDashboard();
  renderDashboardWeekPreview();
  renderStudents();
  renderRecordComposer();
  renderRecords();
  renderSchedule();
  renderTracker();
}

function renderStudentControls() {
  els.studentExam.value = normalizeExam(els.studentExam.value);
  els.studentFoundation.value = normalizeFoundation(els.studentFoundation.value);
  els.studentTarget.value = normalizeTarget(els.studentExam.value, els.studentTarget.value);
  els.studentCourseMode.value = normalizeCourseMode(els.studentCourseMode.value);
  els.studentPackagePlan.value = normalizeCourseProduct(els.studentCourseMode.value, els.studentPackagePlan.value);
  renderExamPicker();
  renderFoundationPicker();
  renderCourseModePicker();
  syncStudentTargetSliderBounds();
  renderCourseProductOptions();
  syncStudentTargetDisplay();
  syncCourseProductDisplay();
}

function renderExamPicker() {
  els.studentExamPicker.innerHTML = Object.keys(EXAM_CONFIG)
    .map(
      (exam) => `
        <button
          type="button"
          class="filter-chip ${els.studentExam.value === exam ? "is-active" : ""}"
          data-exam="${exam}"
        >
          ${exam}
        </button>
      `,
    )
    .join("");
}

function handleExamSelection(event) {
  const button = event.target.closest("[data-exam]");
  if (!button) {
    return;
  }
  els.studentExam.value = button.dataset.exam;
  syncStudentTargetSliderBounds();
  syncStudentTargetDisplay();
  renderExamPicker();
}

function renderFoundationPicker() {
  els.studentFoundationPicker.innerHTML = FOUNDATION_OPTIONS.map(
    (item) => `
      <button
        type="button"
        class="filter-chip ${els.studentFoundation.value === item ? "is-active" : ""}"
        data-foundation="${item}"
      >
        ${item}
      </button>
    `,
  ).join("");
}

function handleFoundationSelection(event) {
  const button = event.target.closest("[data-foundation]");
  if (!button) {
    return;
  }
  els.studentFoundation.value = button.dataset.foundation;
  renderFoundationPicker();
}

function renderCourseModePicker() {
  els.studentCourseModePicker.innerHTML = COURSE_MODE_OPTIONS.map(
    (item) => `
      <button
        type="button"
        class="filter-chip ${els.studentCourseMode.value === item ? "is-active" : ""}"
        data-course-mode="${item}"
      >
        ${item}
      </button>
    `,
  ).join("");
}

function handleCourseModeSelection(event) {
  const button = event.target.closest("[data-course-mode]");
  if (!button) {
    return;
  }
  els.studentCourseMode.value = button.dataset.courseMode;
  renderCourseProductOptions();
  syncCourseProductDisplay(true);
  renderCourseModePicker();
}

function syncStudentTargetSliderBounds() {
  const exam = els.studentExam.value || "IELTS";
  const options = EXAM_CONFIG[exam] || EXAM_CONFIG.IELTS;
  els.studentTargetRange.min = "0";
  els.studentTargetRange.max = String(options.length - 1);
  els.studentTargetRange.step = "1";
  const targetIndex = resolveTargetIndex(exam, els.studentTarget.value);
  els.studentTargetRange.value = String(targetIndex);
  els.studentTargetTicks.style.gridTemplateColumns = `repeat(${options.length}, minmax(0, 1fr))`;
  els.studentTargetTicks.innerHTML = options.map((item) => `<span>${item}</span>`).join("");
  syncStudentTargetDisplay();
}

function syncStudentTargetDisplay() {
  const exam = els.studentExam.value || "IELTS";
  const options = EXAM_CONFIG[exam] || EXAM_CONFIG.IELTS;
  const index = clampIndex(Number(els.studentTargetRange.value || 0), options.length);
  const value = options[index];
  els.studentTarget.value = value;
  els.studentTargetDisplay.textContent = value;
}

function renderCourseProductOptions() {
  const products = getCourseProducts(els.studentCourseMode.value);
  const selected = normalizeCourseProduct(els.studentCourseMode.value, els.studentPackagePlan.value);
  els.studentPackagePlan.innerHTML = products.map((item) => `<option value="${item.value}">${item.label}</option>`).join("");
  els.studentPackagePlan.value = selected;
}

function syncCourseProductDisplay(force = false) {
  const product = getCourseProduct(els.studentCourseMode.value, els.studentPackagePlan.value);
  if (product.hours && (force || !els.studentPackageHours.value)) {
    els.studentPackageHours.value = product.hours;
  } else if (!els.studentPackageHours.value) {
    els.studentPackageHours.value = "";
  }
}

function renderSummary() {
  const monthRecords = getRecordsByMonth(state.ui.selectedMonth);
  const totalTeacherHours = sumHours(monthRecords.filter((record) => record.status !== "cancelled"));
  const completedHours = sumHours(monthRecords.filter((record) => record.status === "completed"));
  const scheduledHours = sumHours(monthRecords.filter((record) => record.status === "scheduled"));
  const cancelledHours = sumHours(monthRecords.filter((record) => record.status === "cancelled"));
  const followUpCount = buildFollowUps().length + getManualTodoItems().length;
  const activeStudents = new Set(monthRecords.map((record) => record.studentId).filter(Boolean)).size;

  const cards = [
    { label: "教师总课时", value: formatHours(totalTeacherHours), note: "本月全部未取消授课" },
    { label: "已完成授课", value: formatHours(completedHours), note: "已经真实发生的课时" },
    { label: "待上课时", value: formatHours(scheduledHours), note: `${activeStudents} 位学生仍在排课中` },
    { label: "待处理", value: String(followUpCount), note: `取消 ${formatHours(cancelledHours)} / 待跟进事项` },
  ];

  els.summaryGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card">
          <div class="summary-label">${card.label}</div>
          <div class="summary-value">${card.value}</div>
          <div class="summary-note">${card.note}</div>
        </article>
      `,
    )
    .join("");
}

function renderDashboard() {
  els.monthPicker.value = state.ui.selectedMonth;
  const monthRecords = getRecordsByMonth(state.ui.selectedMonth);
  const groupedHours = groupHoursByStudent(monthRecords);
  const totalTeacherHours = sumHours(monthRecords.filter((record) => record.status !== "cancelled"));
  const completedHours = sumHours(monthRecords.filter((record) => record.status === "completed"));
  const scheduledHours = sumHours(monthRecords.filter((record) => record.status === "scheduled"));
  const cancelledHours = sumHours(monthRecords.filter((record) => record.status === "cancelled"));
  const activeStudents = new Set(monthRecords.map((record) => record.studentId).filter(Boolean)).size;
  const rewardProgress = Math.min((totalTeacherHours / 80) * 100, 100);
  const rewardRemaining = Math.max(80 - totalTeacherHours, 0);

  els.monthlyHours.innerHTML = groupedHours.length
    ? groupedHours
        .map(
          (item) => `
            <div class="stack-item">
              <div class="student-title">
                <h3>${escapeHtml(item.name)}</h3>
                ${renderCourseBadge(item.courseMode)}
              </div>
              <div class="stack-meta">教师对该学生：总计 ${formatHours(item.plannedHours)} · 已完成 ${formatHours(item.completedHours)} · ${item.totalRecords} 条记录</div>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-state">这个月还没有排课或上课记录。</div>`;

  els.teacherOverviewPanel.innerHTML = `
    <div class="focus-card">
      <div class="focus-title">
        <div>
          <h3>${state.ui.selectedMonth} 教师授课总览</h3>
          <div class="stack-meta">这部分只统计老师自己的授课课时，不是学生做题数量。</div>
        </div>
        <span class="tag">教师视角</span>
      </div>
      <div class="mini-grid">
        <div class="mini-stat">
          <strong>${formatHours(totalTeacherHours)}</strong>
          <span>本月总课时</span>
        </div>
        <div class="mini-stat">
          <strong>${formatHours(completedHours)}</strong>
          <span>已完成授课</span>
        </div>
        <div class="mini-stat">
          <strong>${formatHours(scheduledHours)}</strong>
          <span>待上课时</span>
        </div>
        <div class="mini-stat">
          <strong>${formatHours(cancelledHours)}</strong>
          <span>取消课时</span>
        </div>
      </div>
      <div>
        <div class="section-mini">本月覆盖</div>
        <div class="suggestion-row">
          <span class="tag">${activeStudents} 位学生</span>
          <span class="tag">${monthRecords.length} 条记录</span>
          <span class="tag">${monthRecords.filter((record) => record.status === "completed").length} 条已完成</span>
        </div>
      </div>
    </div>
  `;

  els.rewardPanel.innerHTML = `
    <div class="reward-card ${totalTeacherHours >= 80 ? "is-complete" : ""}">
      <div class="reward-head">
        <div>
          <h3>${totalTeacherHours >= 80 ? "已达到奖励门槛" : "距离奖励还差一点"}</h3>
          <div class="stack-meta">本月教师总课时超过 80h 后触发奖励提醒。</div>
        </div>
        <strong>${formatHours(totalTeacherHours)}</strong>
      </div>
      <div class="reward-track">
        <div class="reward-bar" style="width: ${rewardProgress}%"></div>
      </div>
      <div class="reward-foot">
        <span>目标 80h</span>
        <span>${totalTeacherHours >= 80 ? "奖励已达成" : `还差 ${formatHours(rewardRemaining)}`}</span>
      </div>
    </div>
  `;

  els.todoInput.value = state.todoNote || "";
  const followUps = getManualTodoItems().concat(buildFollowUps());
  els.followUpList.innerHTML = followUps.length
    ? followUps
        .map(
          (item) => `
            <div class="stack-item">
              <h3>${escapeHtml(item.title)}</h3>
              <div class="stack-meta">${escapeHtml(item.detail)}</div>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-state">目前没有紧急待处理项。</div>`;
}

function renderDashboardWeekPreview() {
  const weekRecords = getWeekRecords(state.ui.scheduleAnchorDate);
  els.memoInput.value = state.memo || "";
  els.weekNoteInput.value = state.weekNote || "";
  els.scheduleAnchorDate.value = (state.ui.scheduleAnchorDate || today()).slice(0, 7);
  const manualWeekNote = state.weekNote
    ? [
        {
          manual: true,
          title: "课程预览补充",
          detail: state.weekNote,
        },
      ]
    : [];
  const weekItems = manualWeekNote.concat(
    weekRecords.slice(0, 5).map((record) => ({
      title: `${formatWeekday(record.date)} · ${record.startTime || "--:--"}-${record.endTime || "--:--"}`,
      detail: `${getStudentById(record.studentId)?.name || "未找到学生"} · ${formatHours(record.duration || 0)} · ${formatStatus(record.status)}`,
    })),
  );
  els.dashboardWeekPanel.innerHTML = weekItems.length
    ? weekItems
        .slice(0, 5)
        .map(
          (item) => `
            <div class="stack-item">
              <h3>${escapeHtml(item.title)}</h3>
              <div class="stack-meta">${escapeHtml(item.detail)}</div>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-state">本周还没有课程安排。</div>`;
}

function renderStudents() {
  if (!state.students.length) {
    els.studentList.innerHTML = `<div class="empty-state">还没有学生，先录入第一位学生。</div>`;
    return;
  }

  els.studentList.innerHTML = state.students
    .map((student) => {
      const isCurrent = student.id === state.ui.selectedStudentId;
      const pending = getPendingAssignments(student.id).length;
      return `
        <div class="stack-item ${isCurrent ? "is-current" : ""}">
          <div class="student-title">
            <h3>${escapeHtml(student.name)}</h3>
            ${renderCourseBadge(student.courseMode)}
          </div>
          <div class="stack-meta">
            ${escapeHtml(student.exam || "IELTS")} · ${escapeHtml(student.foundation || "中等")} ${student.foundationScore ? `(${escapeHtml(student.foundationScore)})` : ""} · 目标 ${escapeHtml(student.target || "6.5")}<br />
            考试日期：${escapeHtml(student.examDate || "待定")}<br />
            ${escapeHtml(student.courseMode || "雅思1v1")} · ${escapeHtml(student.packagePlan || "雅思1v1")} · ${student.packageHours ? `${escapeHtml(student.packageHours)}h` : "未填课时"}<br />
            助教：${escapeHtml(student.assistant || "未匹配")} · 待完成：${pending}
          </div>
          <div class="stack-actions">
            <button class="ghost-btn" data-action="focus-student" data-id="${student.id}">设为当前</button>
            <button class="ghost-btn" data-action="open-record-student" data-id="${student.id}">去录课</button>
            <button class="ghost-btn" data-action="edit-student" data-id="${student.id}">编辑</button>
            <button class="ghost-btn" data-action="delete-student" data-id="${student.id}">删除</button>
          </div>
        </div>
      `;
    })
    .join("");

  bindActionButtons(els.studentList, {
    "focus-student": focusStudent,
    "open-record-student": openStudentRecord,
    "edit-student": editStudent,
    "delete-student": deleteStudent,
  });
}

function renderStudentOptions() {
  const options = state.students.length
    ? state.students
        .map(
          (student) => `<option value="${student.id}" ${student.id === state.ui.selectedStudentId ? "selected" : ""}>${escapeHtml(student.name)}</option>`,
        )
        .join("")
    : `<option value="">请先新增学生</option>`;

  els.recordStudent.innerHTML = options;

  const trackerOptions = state.students.length
    ? state.students
        .map(
          (student) =>
            `<option value="${student.id}" ${student.id === state.ui.trackerStudentId ? "selected" : ""}>${escapeHtml(student.name)}</option>`,
        )
        .join("")
    : `<option value="">请先新增学生</option>`;
  els.trackerStudent.innerHTML = trackerOptions;
}

function renderSeriesOptions() {
  const builderOptions = MATERIAL_SERIES.map((series) => `<option value="${series}">${series}</option>`).join("");
  els.builderSeries.innerHTML = builderOptions;
  if (!MATERIAL_SERIES.includes(els.builderSeries.value)) {
    els.builderSeries.value = "C6";
  }

  const trackerOptions = ['<option value="all">全部</option>']
    .concat(
      MATERIAL_SERIES.map(
        (series) => `<option value="${series}" ${series === state.ui.trackerSeries ? "selected" : ""}>${series}</option>`,
      ),
    )
    .join("");
  els.trackerSeries.innerHTML = trackerOptions;
}

function renderRecordComposer() {
  renderLessonTagPicker();
  renderBuilderPartPicker();
  renderWritingPickers();
  renderDraftPreview("completed", els.completedPreview, draftRecord.completedMaterials);
  renderDraftPreview("assigned", els.assignedPreview, draftRecord.assignedMaterials);
  syncRecordTimeSection();
  renderRecordSuggestions();
}

function renderSchedule() {
  const anchorDate = state.ui.scheduleAnchorDate || today();
  const month = anchorDate.slice(0, 7);
  const monthDays = getMonthCalendarDays(anchorDate);
  const monthRecords = getRecordsByMonth(month);
  const selectedDate = normalizeSelectedScheduleDate(month);
  const selectedRecords = getRecordsByDate(selectedDate);
  els.scheduleAnchorDate.value = month;
  els.scheduleWeekRange.innerHTML = `
    <span class="tag">${formatMonthTitle(month)}</span>
    <span class="tag">本月 ${monthRecords.length} 节课</span>
    <span class="tag">已选 ${selectedDate.slice(5)} · ${selectedRecords.length} 节</span>
  `;
  els.scheduleWeekHeader.innerHTML = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    .map((label) => `<span>${label}</span>`)
    .join("");

  els.scheduleBoard.innerHTML = monthDays
    .map((day) => {
      const items = getRecordsByDate(day.date);
      return `
        <button
          type="button"
          class="schedule-day ${day.inMonth ? "" : "is-outside"} ${day.date === selectedDate ? "is-selected" : ""} ${day.date === today() ? "is-today" : ""}"
          data-schedule-date="${day.date}"
        >
          <div class="schedule-day-label">
            <span>${formatWeekday(day.date, true)}</span>
            <strong>${Number(day.date.slice(8))}</strong>
          </div>
          ${
            items.length
              ? items
                  .slice(0, 3)
                  .map(
                    (record) => `
                      <div class="schedule-course">
                        <strong>${record.startTime || "--:--"}-${record.endTime || "--:--"}</strong>
                        <span>${escapeHtml(getStudentById(record.studentId)?.name || "未找到学生")}</span>
                      </div>
                    `,
                  )
                  .join("") + (items.length > 3 ? `<div class="schedule-more">还有 ${items.length - 3} 节</div>` : "")
              : `<div class="schedule-empty">暂无课程</div>`
          }
        </button>
      `;
    })
    .join("");

  els.scheduleAgenda.innerHTML = selectedRecords.length
    ? selectedRecords
        .map(
          (record) => `
            <div class="stack-item">
              <div class="student-title">
                <h3>${record.startTime || "--:--"}-${record.endTime || "--:--"}</h3>
                ${getStudentById(record.studentId) ? renderCourseBadge(getStudentById(record.studentId)?.courseMode) : ""}
              </div>
              <div class="stack-meta">${escapeHtml(getStudentById(record.studentId)?.name || "未找到学生")} · ${formatHours(record.duration || 0)} · ${formatStatus(record.status)}</div>
              <div class="stack-actions">
                <button class="ghost-btn" data-action="edit-record" data-id="${record.id}">编辑</button>
                <button class="ghost-btn" data-action="delete-record" data-id="${record.id}">删除</button>
              </div>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-state">${selectedDate} 暂无课程，点击其他日期查看安排。</div>`;

  bindActionButtons(els.scheduleAgenda, {
    "edit-record": editRecord,
    "delete-record": deleteRecord,
  });
}

function syncRecordTimeSection() {
  const duration = calculateDurationHours(els.recordStartTime.value, els.recordEndTime.value);
  els.recordDuration.value = String(duration);
  els.recordDurationDisplay.textContent = formatHours(duration);
  const position = calculateTimeWeightPosition(els.recordStartTime.value, els.recordEndTime.value);
  els.recordTimeWeightBar.style.left = `${position.left}%`;
  els.recordTimeWeightBar.style.width = `${position.width}%`;
}

function renderLessonTagPicker() {
  const lessonTags = getAllLessonTags();
  const groups = Array.from(new Set(lessonTags.map((tag) => tag.group)));
  els.lessonTagPicker.innerHTML = groups
    .map((group) => {
      const tags = lessonTags.filter((tag) => tag.group === group);
      return `
        <div class="module-group">
          <div class="section-mini">${group}</div>
          <div class="chip-grid">
            ${tags
              .map(
                (tag) => `
                  <button
                    type="button"
                    class="filter-chip ${draftRecord.lessonTags.includes(tag.id) ? "is-active" : ""}"
                    data-tag-id="${escapeHtml(tag.id)}"
                  >
                    ${escapeHtml(tag.label)}
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");
}

function addCustomLessonTag() {
  const label = els.customLessonTagInput.value.trim();
  if (!label) {
    window.alert("请先输入课堂模块名称。");
    return;
  }

  const allTags = getAllLessonTags();
  const existing = allTags.find((tag) => tag.label === label);
  const tag = existing || {
    id: `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    label,
    group: "自定义",
  };

  if (!existing) {
    state.customLessonTags = normalizeLessonTags([...(state.customLessonTags || []), tag]);
    persist();
  }
  draftRecord.lessonTags = uniqueList(draftRecord.lessonTags.concat(tag.id));
  els.customLessonTagInput.value = "";
  renderLessonTagPicker();
}

function renderBuilderPartPicker() {
  const parts = MODULE_PARTS[els.builderModule.value] || [];
  const isExternal = els.builderModule.value === "external-reading";
  els.builderSeries.disabled = isExternal;
  els.builderTest.disabled = isExternal;
  els.builderPartPicker.innerHTML = parts
    .map(
      (part) => `
        <button type="button" class="material-chip" data-part="${part}">
          ${part}
        </button>
      `,
    )
    .join("");
}

function renderWritingPickers() {
  renderWritingPicker(els.writingTask1Picker, "task1", WRITING_TASK_TYPES.task1, draftRecord.writingTask1Types);
  renderWritingPicker(els.writingTask2Picker, "task2", WRITING_TASK_TYPES.task2, draftRecord.writingTask2Types);
}

function renderWritingPicker(container, task, options, selected) {
  container.innerHTML = options
    .map(
      (type) => `
        <button
          type="button"
          class="material-chip ${selected.includes(type) ? "is-active" : ""}"
          data-task="${task}"
          data-writing-type="${type}"
        >
          ${type}
        </button>
      `,
    )
    .join("");
}

function renderDraftPreview(listName, container, list) {
  container.innerHTML = list.length
    ? list
        .map(
          (code) => `
            <span class="preview-chip">
              ${code}
              <button type="button" data-list="${listName}" data-remove-code="${code}" aria-label="删除 ${code}">x</button>
            </span>
          `,
        )
        .join("")
    : `<span class="tag">暂未选择</span>`;
}

function renderRecords() {
  if (!state.records.length) {
    els.recordList.innerHTML = `<div class="empty-state">还没有课程记录。</div>`;
    return;
  }

  els.recordList.innerHTML = [...state.records]
    .sort((left, right) => `${right.date}${right.startTime || ""}`.localeCompare(`${left.date}${left.startTime || ""}`))
    .map(renderRecordCard)
    .join("");

  bindActionButtons(els.recordList, {
    "edit-record": editRecord,
    "delete-record": deleteRecord,
  });
}

function renderRecordCard(record) {
  const student = getStudentById(record.studentId);
  const lessonTagLabels = getLessonTagLabels(record.lessonTags).join(" · ") || "未选课堂模块";
  const completedPreview = compactMaterialText(record.completedMaterials);
  const assignedPreview = compactMaterialText(record.assignedMaterials);
  const writingText = formatWritingText(record.writing);

  return `
    <div class="stack-item">
      <div class="student-title">
        <h3>${escapeHtml(student ? student.name : "未找到学生")} · ${record.date}</h3>
        ${student ? renderCourseBadge(student.courseMode) : ""}
      </div>
      <div class="stack-meta">
        ${record.startTime || "--:--"}-${record.endTime || "--:--"} · ${formatStatus(record.status)} · ${formatHours(record.duration || 0)}<br />
        课堂模块：${escapeHtml(lessonTagLabels)}<br />
        本次课堂：${escapeHtml(completedPreview)}<br />
        课后作业：${escapeHtml(assignedPreview)}<br />
        写作情况：${escapeHtml(writingText)}${record.homeworkNote ? `<br />作业备注：${escapeHtml(record.homeworkNote)}` : ""}
      </div>
      <div class="stack-actions">
        <button class="ghost-btn" data-action="edit-record" data-id="${record.id}">编辑</button>
        <button class="ghost-btn" data-action="delete-record" data-id="${record.id}">删除</button>
      </div>
    </div>
  `;
}

function renderRecordSuggestions() {
  const studentId = els.recordStudent.value || state.ui.selectedStudentId;
  const module = els.builderModule.value;

  if (!studentId) {
    els.recordSuggestionBox.innerHTML = `<span class="tag">先新增学生</span>`;
    return;
  }

  const suggestions = suggestNextMaterials(studentId, module, 6);
  els.recordSuggestionBox.innerHTML = suggestions.length
    ? suggestions
        .map((code) => `<button type="button" class="chip-btn" data-suggested-material="${code}">${code}</button>`)
        .join("")
    : `<span class="tag">当前模块已经全部分配或完成</span>`;

  els.recordSuggestionBox.querySelectorAll("[data-suggested-material]").forEach((button) => {
    button.addEventListener("click", () => {
      draftRecord.assignedMaterials = uniqueList(draftRecord.assignedMaterials.concat(button.dataset.suggestedMaterial));
      renderDraftPreview("assigned", els.assignedPreview, draftRecord.assignedMaterials);
    });
  });
}

function renderTracker() {
  const studentId = els.trackerStudent.value || state.ui.trackerStudentId;
  const module = els.trackerModule.value;
  const selectedSeries = els.trackerSeries.value || state.ui.trackerSeries;

  if (!studentId) {
    els.trackerSummary.innerHTML = `<span class="tag">先新增学生再追踪材料。</span>`;
    els.trackerSuggestions.innerHTML = "";
    els.pendingMaterials.innerHTML = `<div class="empty-state">暂无数据</div>`;
    els.completedMaterials.innerHTML = `<div class="empty-state">暂无数据</div>`;
    els.trackerCatalog.innerHTML = "";
    return;
  }

  const counts = getMaterialStatusCounts(studentId, module);
  const pending = getPendingAssignments(studentId, module);
  const completed = getCompletedMaterials(studentId, module);
  const suggestions = suggestNextMaterials(studentId, module, 8);
  const catalog = getCatalogItems(module, selectedSeries).slice(0, 48);

  els.trackerSummary.innerHTML = `
    <span class="tag">已完成 ${counts.completed}</span>
    <span class="tag">待完成 ${counts.assigned}</span>
    <span class="tag">未触达 ${counts.remaining}</span>
  `;

  els.trackerSuggestions.innerHTML = suggestions.length
    ? suggestions.map((code) => `<span class="chip-btn">${code}</span>`).join("")
    : `<span class="tag">暂无新建议</span>`;

  els.pendingMaterials.innerHTML = pending.length
    ? pending
        .slice(0, 6)
        .map(
          (item) => `
            <div class="stack-item">
              <h3>${item.code}</h3>
              <div class="stack-meta">${item.date} 布置</div>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-state">暂无待完成题目。</div>`;

  els.completedMaterials.innerHTML = completed.length
    ? completed
        .slice(0, 6)
        .map(
          (item) => `
            <div class="stack-item">
              <h3>${item.code}</h3>
              <div class="stack-meta">${item.date} 完成</div>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-state">暂无完成记录。</div>`;

  els.trackerCatalog.innerHTML = catalog
    .map((item) => {
      const status = getMaterialStatus(studentId, module, item.code);
      const label = status === "completed" ? "已完成" : status === "assigned" ? "已布置" : "未使用";
      return `
        <div class="catalog-card">
          <strong>${item.code}</strong>
          <div class="catalog-status ${status ? `status-${status}` : ""}">${label}</div>
        </div>
      `;
    })
    .join("");
}

function handleStudentSubmit(event) {
  event.preventDefault();
  const payload = {
    id: els.studentId.value || createId("student"),
    name: els.studentName.value.trim(),
    exam: els.studentExam.value || "IELTS",
    foundation: els.studentFoundation.value || FOUNDATION_OPTIONS[2],
    foundationScore: els.studentFoundationScore.value.trim(),
    target: els.studentTarget.value || EXAM_CONFIG.IELTS[2],
    examDate: els.studentExamDate.value || "",
    courseMode: els.studentCourseMode.value || COURSE_MODE_OPTIONS[0],
    packageHours: els.studentPackageHours.value || "",
    packagePlan: els.studentPackagePlan.value || normalizeCourseProduct(els.studentCourseMode.value, ""),
    assistant: els.studentAssistant.value || "未匹配",
    notes: els.studentNotes.value.trim(),
  };

  if (!payload.name) {
    window.alert("请先填写学生姓名。");
    return;
  }

  upsert(state.students, payload);
  state.ui.selectedStudentId = payload.id;
  state.ui.trackerStudentId = payload.id;
  persist();
  resetStudentForm();
  renderAll();
}

function handleRecordSubmit(event) {
  event.preventDefault();
  const completedMaterials = uniqueList(draftRecord.completedMaterials.map((code) => normalizeMaterialCode(code)));
  const assignedMaterials = uniqueList(draftRecord.assignedMaterials.map((code) => normalizeMaterialCode(code)));
  const duration = calculateDurationHours(els.recordStartTime.value, els.recordEndTime.value);

  const payload = {
    id: els.recordId.value || createId("record"),
    studentId: els.recordStudent.value,
    date: els.recordDate.value,
    startTime: els.recordStartTime.value,
    endTime: els.recordEndTime.value,
    duration,
    status: els.recordStatus.value,
    lessonTags: [...draftRecord.lessonTags],
    primaryModule: els.builderModule.value,
    completedMaterials,
    assignedMaterials,
    writing: {
      task1Types: [...draftRecord.writingTask1Types],
      task2Types: [...draftRecord.writingTask2Types],
      note: els.recordWritingNote.value.trim(),
    },
    homeworkCompletion: Number(els.recordHomeworkCompletion.value || 0),
    homeworkNote: els.recordHomeworkNote.value.trim(),
    notes: els.recordNotes.value.trim(),
  };

  if (!payload.studentId || !payload.date) {
    window.alert("请先选择学生和日期。");
    return;
  }

  if (!payload.startTime || !payload.endTime || duration <= 0) {
    window.alert("请填写有效的开始时间和结束时间。");
    return;
  }

  if (
    !payload.completedMaterials.length &&
    !payload.writing.task1Types.length &&
    !payload.writing.task2Types.length &&
    !payload.writing.note &&
    !payload.assignedMaterials.length
  ) {
    window.alert("请至少加入一项授课内容、写作记录或课后作业。");
    return;
  }

  const existing = state.records.find((record) => record.id === payload.id);
  if (existing) {
    removeMaterialLogsByRecord(existing.id);
  }

  upsert(state.records, payload);
  payload.completedMaterials.forEach((code) => addMaterialLog(payload, code, "completed"));
  payload.assignedMaterials.forEach((code) => addMaterialLog(payload, code, "assigned"));
  persist();
  resetRecordForm();
  renderAll();
}

function editStudent(id) {
  const student = getStudentById(id);
  if (!student) {
    return;
  }
  els.studentId.value = student.id;
  els.studentName.value = student.name || "";
  els.studentExam.value = normalizeExam(student.exam);
  els.studentFoundation.value = normalizeFoundation(student.foundation);
  els.studentFoundationScore.value = student.foundationScore || "";
  els.studentTarget.value = normalizeTarget(els.studentExam.value, student.target);
  els.studentExamDate.value = student.examDate || "";
  els.studentCourseMode.value = normalizeCourseMode(student.courseMode);
  els.studentPackagePlan.value = normalizeCourseProduct(els.studentCourseMode.value, student.packagePlan);
  els.studentPackageHours.value = normalizePackageHoursInput(student.packageHours);
  els.studentAssistant.value = student.assistant || "未匹配";
  els.studentNotes.value = student.notes || "";
  renderStudentControls();
  switchTab("students");
}

function focusStudent(id) {
  state.ui.selectedStudentId = id;
  state.ui.trackerStudentId = id;
  persist();
  renderAll();
}

function openStudentRecord(id) {
  state.ui.selectedStudentId = id;
  state.ui.trackerStudentId = id;
  persist();
  resetRecordForm();
  switchTab("records");
  els.recordStudent.value = id;
  renderRecordSuggestions();
  els.recordStudent.scrollIntoView({ block: "start", behavior: "smooth" });
}

function deleteStudent(id) {
  if (!window.confirm("删除学生后，其课程记录和材料记录也会一起删除。确定继续吗？")) {
    return;
  }
  state.students = state.students.filter((student) => student.id !== id);
  const removedRecordIds = state.records.filter((record) => record.studentId === id).map((record) => record.id);
  state.records = state.records.filter((record) => record.studentId !== id);
  state.materialLogs = state.materialLogs.filter((log) => !removedRecordIds.includes(log.recordId));
  if (state.ui.selectedStudentId === id) {
    state.ui.selectedStudentId = state.students[0] ? state.students[0].id : "";
  }
  if (state.ui.trackerStudentId === id) {
    state.ui.trackerStudentId = state.students[0] ? state.students[0].id : "";
  }
  persist();
  renderAll();
}

function editRecord(id) {
  const record = state.records.find((item) => item.id === id);
  if (!record) {
    return;
  }
  els.recordId.value = record.id;
  els.recordStudent.value = record.studentId;
  els.recordDate.value = record.date;
  els.recordStartTime.value = record.startTime || "10:00";
  els.recordEndTime.value = record.endTime || defaultEndTimeFromDuration(record.startTime, record.duration);
  els.recordStatus.value = record.status;
  els.recordHomeworkCompletion.value = record.homeworkCompletion ?? 0;
  els.recordHomeworkNote.value = record.homeworkNote || "";
  els.recordWritingNote.value = record.writing?.note || "";
  els.recordNotes.value = record.notes || "";
  els.builderModule.value = record.primaryModule || detectMaterialModule(record.completedMaterials[0] || record.assignedMaterials[0]) || "listening";
  els.builderSeries.value = detectSeriesFromCode(record.completedMaterials[0] || record.assignedMaterials[0]) || "C6";
  if (!MATERIAL_SERIES.includes(els.builderSeries.value)) {
    els.builderSeries.value = "C6";
  }
  els.builderTest.value = detectTestFromCode(record.completedMaterials[0] || record.assignedMaterials[0]) || "1";
  draftRecord.lessonTags = Array.isArray(record.lessonTags) ? [...record.lessonTags] : [];
  draftRecord.completedMaterials = Array.isArray(record.completedMaterials) ? [...record.completedMaterials] : [];
  draftRecord.assignedMaterials = Array.isArray(record.assignedMaterials) ? [...record.assignedMaterials] : [];
  draftRecord.writingTask1Types = Array.isArray(record.writing?.task1Types) ? [...record.writing.task1Types] : [];
  draftRecord.writingTask2Types = Array.isArray(record.writing?.task2Types) ? [...record.writing.task2Types] : [];
  renderRecordComposer();
  switchTab("records");
}

function deleteRecord(id) {
  if (!window.confirm("确定删除这条课程记录吗？")) {
    return;
  }
  state.records = state.records.filter((record) => record.id !== id);
  removeMaterialLogsByRecord(id);
  persist();
  renderAll();
}

function resetStudentForm() {
  els.studentForm.reset();
  els.studentId.value = "";
  els.studentExam.value = "IELTS";
  els.studentFoundation.value = FOUNDATION_OPTIONS[2];
  els.studentFoundationScore.value = "";
  els.studentTarget.value = EXAM_CONFIG.IELTS[2];
  els.studentExamDate.value = "";
  els.studentCourseMode.value = COURSE_MODE_OPTIONS[0];
  els.studentPackagePlan.value = normalizeCourseProduct(COURSE_MODE_OPTIONS[0], "");
  els.studentPackageHours.value = "";
  els.studentAssistant.value = "Polla";
  renderStudentControls();
}

function resetRecordForm() {
  els.recordForm.reset();
  els.recordId.value = "";
  els.recordDate.value = today();
  els.recordStatus.value = "scheduled";
  els.recordStudent.value = state.ui.selectedStudentId || "";
  els.recordStartTime.value = "10:00";
  els.recordEndTime.value = "12:00";
  els.recordHomeworkCompletion.value = 0;
  els.recordWritingNote.value = "";
  els.builderModule.value = "listening";
  els.builderSeries.value = "C6";
  els.builderTest.value = "1";
  draftRecord.lessonTags = [];
  draftRecord.completedMaterials = [];
  draftRecord.assignedMaterials = [];
  draftRecord.writingTask1Types = [];
  draftRecord.writingTask2Types = [];
  renderRecordComposer();
}

function addBuilderSelectionToDraft(target) {
  const codes = getBuilderSelectionCodes();
  if (!codes.length) {
    window.alert("请先选择材料项。");
    return;
  }

  if (target === "completed") {
    draftRecord.completedMaterials = uniqueList(draftRecord.completedMaterials.concat(codes));
  } else {
    draftRecord.assignedMaterials = uniqueList(draftRecord.assignedMaterials.concat(codes));
  }
  renderDraftPreview("completed", els.completedPreview, draftRecord.completedMaterials);
  renderDraftPreview("assigned", els.assignedPreview, draftRecord.assignedMaterials);
}

function removeDraftMaterial(listName, code) {
  const key = listName === "completed" ? "completedMaterials" : "assignedMaterials";
  draftRecord[key] = draftRecord[key].filter((item) => item !== code);
  renderDraftPreview("completed", els.completedPreview, draftRecord.completedMaterials);
  renderDraftPreview("assigned", els.assignedPreview, draftRecord.assignedMaterials);
}

function toggleLessonTag(tagId) {
  if (draftRecord.lessonTags.includes(tagId)) {
    draftRecord.lessonTags = draftRecord.lessonTags.filter((item) => item !== tagId);
  } else {
    draftRecord.lessonTags = draftRecord.lessonTags.concat(tagId);
  }
  renderLessonTagPicker();
}

function toggleWritingType(task, type) {
  const key = task === "task1" ? "writingTask1Types" : "writingTask2Types";
  if (draftRecord[key].includes(type)) {
    draftRecord[key] = draftRecord[key].filter((item) => item !== type);
  } else {
    draftRecord[key] = draftRecord[key].concat(type);
  }
  renderWritingPickers();
}

function getBuilderSelectionCodes() {
  const module = els.builderModule.value;
  const series = els.builderSeries.value;
  const test = els.builderTest.value;
  const parts = Array.from(els.builderPartPicker.querySelectorAll(".is-active")).map((button) => button.dataset.part);
  if (module === "external-reading") {
    return parts.map((part) => `外刊精读-${part}`);
  }
  return parts.map((part) => `${series}-Test${test}-${part}`);
}

function loadDemoData() {
  if (state.students.length || state.records.length) {
    const proceed = window.confirm("载入示例数据会覆盖当前本地数据，确定继续吗？");
    if (!proceed) {
      return;
    }
  }

  const studentA = {
    id: createId("student"),
    name: "Luna",
    exam: "IELTS",
    foundation: "中等",
    foundationScore: "IELTS 5.5",
    target: "7.0",
    examDate: shiftDate(today(), 34),
    courseMode: "雅思1v1",
    packageHours: "30",
    packagePlan: "雅思1v1-30课时",
    assistant: "Polla",
    notes: "6 月考试，容易重复刷旧题。",
  };
  const studentB = {
    id: createId("student"),
    name: "Mason",
    exam: "IELTS",
    foundation: "较稳",
    foundationScore: "IELTS 6.0",
    target: "6.5",
    examDate: shiftDate(today(), 21),
    courseMode: "雅思班课",
    packageHours: "40",
    packagePlan: "雅思强化班-常规开设",
    assistant: "Polla",
    notes: "阅读题量大，重点控重复。",
  };

  state.students = [studentA, studentB];
  state.customLessonTags = [];
  state.records = [
    {
      id: createId("record"),
      studentId: studentA.id,
      date: today(),
      startTime: "10:00",
      endTime: "12:00",
      duration: 2,
      status: "completed",
      lessonTags: ["close-listening", "synonyms", "task2-planning"],
      primaryModule: "listening",
      completedMaterials: ["C16-Test3-Part1"],
      assignedMaterials: ["C16-Test3-Part2", "C16-Test3-Part3"],
      writing: {
        task1Types: ["线图"],
        task2Types: ["同意与否"],
        note: "Task2观点明确，例子展开不够。",
      },
      homeworkCompletion: 60,
      homeworkNote: "整理错题和生词",
      notes: "Part1 比较稳，Part3 需要继续练定位。",
    },
    {
      id: createId("record"),
      studentId: studentB.id,
      date: shiftDate(today(), 1),
      startTime: "15:00",
      endTime: "16:30",
      duration: 1.5,
      status: "scheduled",
      lessonTags: ["error-review", "timed-drill", "external-intensive"],
      primaryModule: "reading",
      completedMaterials: ["C14-Test2-Passage2"],
      assignedMaterials: ["C14-Test2-Passage3", "外刊精读-科技社会"],
      writing: {
        task1Types: [],
        task2Types: ["问题解决"],
        note: "下次补一篇Task2提纲。",
      },
      homeworkCompletion: 0,
      homeworkNote: "做完后标记定位失误点",
      notes: "下次先看 Passage 3。",
    },
  ];
  rebuildMaterialLogs();
  state.ui.selectedStudentId = studentA.id;
  state.ui.trackerStudentId = studentA.id;
  state.ui.selectedMonth = todayMonth();
  state.ui.trackerSeries = "all";
  state.ui.scheduleAnchorDate = today();
  state.ui.selectedScheduleDate = today();
  state.memo = "1. 跟进 Luna 的 Part3 定位。\n2. Mason 下节课先做 Passage3。\n3. 周末整理 5 月排课。";
  state.weekNote = "周三确认班课阅读材料；周五前整理作文批改。";
  state.todoNote = "提醒 Luna 补交 Task2\n确认 Mason 下节课是否线上";
  persist();
  resetStudentForm();
  resetRecordForm();
  renderAll();
}

function exportData() {
  const payload = JSON.stringify(state, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `language-teaching-assistant-${today()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      state.students = normalizeStudents(Array.isArray(parsed.students) ? parsed.students : []);
      state.records = normalizeRecords(Array.isArray(parsed.records) ? parsed.records : []);
      state.materialLogs = Array.isArray(parsed.materialLogs) ? parsed.materialLogs : [];
      state.customLessonTags = normalizeLessonTags(parsed.customLessonTags);
      state.ui = {
        selectedMonth: parsed.ui?.selectedMonth || todayMonth(),
        selectedStudentId: parsed.ui?.selectedStudentId || (state.students[0] ? state.students[0].id : ""),
        trackerStudentId: parsed.ui?.trackerStudentId || (state.students[0] ? state.students[0].id : ""),
        trackerSeries: parsed.ui?.trackerSeries || "all",
        scheduleAnchorDate: parsed.ui?.scheduleAnchorDate || today(),
        selectedScheduleDate: parsed.ui?.selectedScheduleDate || parsed.ui?.scheduleAnchorDate || today(),
      };
      state.memo = parsed.memo || "";
      state.weekNote = parsed.weekNote || "";
      state.todoNote = parsed.todoNote || "";
      if (!state.materialLogs.length) {
        rebuildMaterialLogs();
      }
      persist();
      resetStudentForm();
      resetRecordForm();
      renderAll();
    } catch (error) {
      window.alert("导入失败，请确认文件格式正确。");
    }
  };
  reader.readAsText(file, "utf-8");
  event.target.value = "";
}

async function importStudentsFromSpreadsheet(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  try {
    const rows = await readStudentSpreadsheet(file);
    const imported = buildStudentsFromRows(rows);
    if (!imported.length) {
      window.alert("没有识别到学生数据，请检查表头是否与范本一致。");
      return;
    }

    imported.forEach((student) => upsert(state.students, student));
    state.students = normalizeStudents(state.students);
    if (!state.ui.selectedStudentId && state.students[0]) {
      state.ui.selectedStudentId = state.students[0].id;
    }
    if (!state.ui.trackerStudentId && state.students[0]) {
      state.ui.trackerStudentId = state.students[0].id;
    }
    persist();
    resetStudentForm();
    renderAll();
    window.alert(`已导入 ${imported.length} 位学生。`);
  } catch (error) {
    window.alert("学生导入失败，请确认文件为 .xlsx 或 .csv，且表头与范本一致。");
  } finally {
    event.target.value = "";
  }
}

async function readStudentSpreadsheet(file) {
  const name = file.name.toLowerCase();
  if (name.endsWith(".csv")) {
    return parseCsvRows(await file.text());
  }
  if (!name.endsWith(".xlsx")) {
    throw new Error("Unsupported spreadsheet format");
  }
  return parseXlsxRows(await file.arrayBuffer());
}

function buildStudentsFromRows(rows) {
  const usefulRows = rows.filter((row) => row.some((cell) => String(cell ?? "").trim()));
  if (usefulRows.length < 2) {
    return [];
  }

  const headers = usefulRows[0].map((cell) => String(cell || "").trim());
  const headerMap = new Map(headers.map((header, index) => [header, index]));
  return usefulRows
    .slice(1)
    .map((row) => {
      const name = getRowValue(row, headerMap, ["学生姓名", "姓名", "学生"]);
      if (!name) {
        return null;
      }
      const existing = state.students.find((student) => student.name === name);
      const exam = normalizeExam(getRowValue(row, headerMap, ["考试类型", "考试"]) || "IELTS");
      const courseMode = normalizeCourseMode(getRowValue(row, headerMap, ["课程类型", "课程模式"]));
      const packagePlan = normalizeCourseProduct(courseMode, getRowValue(row, headerMap, ["套餐", "课程套餐", "产品"]));
      const rawHours = getRowValue(row, headerMap, ["课时量", "课时", "总课时"]);
      return {
        id: existing?.id || createId("student"),
        name,
        exam,
        foundation: normalizeFoundation(getRowValue(row, headerMap, ["语言基础", "当前阶段"]) || FOUNDATION_OPTIONS[2]),
        foundationScore: getRowValue(row, headerMap, ["当前基础分数", "基础分数", "当前分数"]),
        target: normalizeTarget(exam, getRowValue(row, headerMap, ["目标分数", "目标分"])),
        examDate: normalizeImportDate(getRowValue(row, headerMap, ["考试日期", "考试时间"])),
        courseMode,
        packagePlan,
        packageHours: normalizePackageHoursInput(rawHours) || normalizePackageHours(courseMode, packagePlan, rawHours),
        assistant: getRowValue(row, headerMap, ["匹配助教", "助教"]) || "Polla",
        notes: getRowValue(row, headerMap, ["备注", "学生备注"]),
      };
    })
    .filter(Boolean);
}

function getRowValue(row, headerMap, aliases) {
  const index = aliases.map((alias) => headerMap.get(alias)).find((item) => Number.isInteger(item));
  return index === undefined ? "" : String(row[index] ?? "").trim();
}

function normalizeImportDate(value) {
  const input = String(value || "").trim();
  if (!input) {
    return "";
  }
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(input)) {
    const [year, month, day] = input.split("-").map(Number);
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }
  if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(input)) {
    const [year, month, day] = input.split("/").map(Number);
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }
  const serial = Number(input);
  if (Number.isFinite(serial) && serial > 20000) {
    const date = new Date(Date.UTC(1899, 11, 30) + serial * 86400000);
    return date.toISOString().slice(0, 10);
  }
  return input;
}

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  rows.push(row);
  return rows;
}

async function parseXlsxRows(buffer) {
  const files = await unzipXlsx(buffer);
  const sheetPath = resolveFirstSheetPath(files);
  const sharedStrings = parseSharedStrings(files["xl/sharedStrings.xml"] || "");
  return parseSheetRows(files[sheetPath] || files["xl/worksheets/sheet1.xml"], sharedStrings);
}

function resolveFirstSheetPath(files) {
  const workbookXml = parseXml(files["xl/workbook.xml"] || "");
  const relsXml = parseXml(files["xl/_rels/workbook.xml.rels"] || "");
  const firstSheet = workbookXml.getElementsByTagName("sheet")[0];
  const relationshipId = firstSheet?.getAttribute("r:id");
  const relationships = Array.from(relsXml.getElementsByTagName("Relationship"));
  const target = relationships.find((item) => item.getAttribute("Id") === relationshipId)?.getAttribute("Target");
  if (!target) {
    return "xl/worksheets/sheet1.xml";
  }
  return normalizeXlsxPath(target.startsWith("/") ? target.slice(1) : `xl/${target}`);
}

function parseSharedStrings(xmlText) {
  if (!xmlText) {
    return [];
  }
  const xml = parseXml(xmlText);
  return Array.from(xml.getElementsByTagName("si")).map((item) =>
    Array.from(item.getElementsByTagName("t"))
      .map((textNode) => textNode.textContent || "")
      .join(""),
  );
}

function parseSheetRows(xmlText, sharedStrings) {
  if (!xmlText) {
    return [];
  }
  const xml = parseXml(xmlText);
  return Array.from(xml.getElementsByTagName("row")).map((rowNode) => {
    const row = [];
    Array.from(rowNode.getElementsByTagName("c")).forEach((cellNode) => {
      const columnIndex = columnRefToIndex(cellNode.getAttribute("r") || "");
      row[columnIndex] = readSheetCell(cellNode, sharedStrings);
    });
    return row.map((cell) => cell ?? "");
  });
}

function readSheetCell(cellNode, sharedStrings) {
  const type = cellNode.getAttribute("t");
  const value = cellNode.getElementsByTagName("v")[0]?.textContent || "";
  if (type === "s") {
    return sharedStrings[Number(value)] || "";
  }
  if (type === "inlineStr") {
    return Array.from(cellNode.getElementsByTagName("t"))
      .map((item) => item.textContent || "")
      .join("");
  }
  return value;
}

function columnRefToIndex(ref) {
  const letters = String(ref || "").match(/[A-Z]+/i)?.[0]?.toUpperCase() || "A";
  return letters.split("").reduce((sum, char) => sum * 26 + char.charCodeAt(0) - 64, 0) - 1;
}

function parseXml(xmlText) {
  return new DOMParser().parseFromString(xmlText, "application/xml");
}

function normalizeXlsxPath(path) {
  const parts = [];
  path.split("/").forEach((part) => {
    if (!part || part === ".") {
      return;
    }
    if (part === "..") {
      parts.pop();
      return;
    }
    parts.push(part);
  });
  return parts.join("/");
}

async function unzipXlsx(buffer) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const decoder = new TextDecoder("utf-8");
  const eocdOffset = findZipEnd(view);
  const entries = view.getUint16(eocdOffset + 10, true);
  let offset = view.getUint32(eocdOffset + 16, true);
  const files = {};

  for (let index = 0; index < entries; index += 1) {
    if (view.getUint32(offset, true) !== 0x02014b50) {
      throw new Error("Invalid zip central directory");
    }
    const method = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localOffset = view.getUint32(offset + 42, true);
    const name = decoder.decode(bytes.slice(offset + 46, offset + 46 + nameLength));
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = bytes.slice(dataStart, dataStart + compressedSize);
    const raw = method === 0 ? compressed : await inflateZipEntry(compressed);
    files[name] = decoder.decode(raw);
    offset += 46 + nameLength + extraLength + commentLength;
  }

  return files;
}

function findZipEnd(view) {
  for (let offset = view.byteLength - 22; offset >= 0; offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) {
      return offset;
    }
  }
  throw new Error("Invalid xlsx zip");
}

async function inflateZipEntry(bytes) {
  const formats = ["deflate-raw", "deflate"];
  for (const format of formats) {
    try {
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream(format));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    } catch (error) {
      // Try the next browser-supported ZIP deflate variant.
    }
  }
  throw new Error("Cannot inflate zip entry");
}

function getRecordsByMonth(month) {
  return state.records.filter((record) => record.date.startsWith(month));
}

function groupHoursByStudent(records) {
  const hours = new Map();
  records.forEach((record) => {
    const student = getStudentById(record.studentId);
    if (!student) {
      return;
    }
    const existing = hours.get(student.id) || {
      name: student.name,
      courseMode: student.courseMode,
      plannedHours: 0,
      completedHours: 0,
      totalRecords: 0,
    };
    if (record.status !== "cancelled") {
      existing.plannedHours += Number(record.duration || 0);
    }
    if (record.status === "completed") {
      existing.completedHours += Number(record.duration || 0);
    }
    existing.totalRecords += 1;
    hours.set(student.id, existing);
  });
  return Array.from(hours.values()).sort((left, right) => right.plannedHours - left.plannedHours);
}

function buildFollowUps() {
  const output = [];

  state.records
    .filter((record) => record.homeworkNote && Number(record.homeworkCompletion) < 100)
    .slice(0, 4)
    .forEach((record) => {
      const student = getStudentById(record.studentId);
      output.push({
        title: `${student ? student.name : "未找到学生"} 的作业仍在进行中`,
        detail: `${record.date} 布置，当前完成度 ${record.homeworkCompletion}%`,
      });
    });

  const pendingByStudent = new Map();
  getPendingAssignments().forEach((item) => {
    const existing = pendingByStudent.get(item.studentId) || {
      count: 0,
      date: item.date,
      sample: item.code,
    };
    existing.count += 1;
    if (existing.date < item.date) {
      existing.date = item.date;
      existing.sample = item.code;
    }
    pendingByStudent.set(item.studentId, existing);
  });

  Array.from(pendingByStudent.entries())
    .slice(0, 4)
    .forEach(([studentId, item]) => {
      const student = getStudentById(studentId);
      output.push({
        title: `${student ? student.name : "未找到学生"} 有待完成材料`,
        detail: `${item.count} 项材料未完成，最近一次布置是 ${item.sample}（${item.date}）`,
      });
    });

  return output;
}

function addMaterialLog(record, code, status) {
  state.materialLogs.push({
    id: createId("material"),
    studentId: record.studentId,
    recordId: record.id,
    module: detectMaterialModule(code) || record.primaryModule || "listening",
    code,
    status,
    date: record.date,
  });
}

function rebuildMaterialLogs() {
  state.records = normalizeRecords(state.records);
  state.materialLogs = [];
  state.records.forEach((record) => {
    record.completedMaterials.forEach((code) => addMaterialLog(record, code, "completed"));
    record.assignedMaterials.forEach((code) => addMaterialLog(record, code, "assigned"));
  });
}

function removeMaterialLogsByRecord(recordId) {
  state.materialLogs = state.materialLogs.filter((log) => log.recordId !== recordId);
}

function getPendingAssignments(studentId, module) {
  return Array.from(buildLatestMaterialMap(studentId, module).values())
    .filter((item) => item.status === "assigned")
    .sort((left, right) => right.date.localeCompare(left.date));
}

function getCompletedMaterials(studentId, module) {
  return Array.from(buildLatestMaterialMap(studentId, module).values())
    .filter((item) => item.status === "completed")
    .sort((left, right) => right.date.localeCompare(left.date));
}

function getMaterialStatusCounts(studentId, module) {
  const latest = buildLatestMaterialMap(studentId, module);
  const total = getCatalogItems(module, "all").length;
  let completed = 0;
  let assigned = 0;
  latest.forEach((item) => {
    if (item.status === "completed") {
      completed += 1;
    } else if (item.status === "assigned") {
      assigned += 1;
    }
  });
  return { completed, assigned, remaining: Math.max(total - completed - assigned, 0) };
}

function buildLatestMaterialMap(studentId, module) {
  const latest = new Map();
  state.materialLogs.forEach((log, index) => {
    if ((studentId && log.studentId !== studentId) || (module && log.module !== module)) {
      return;
    }
    const key = `${log.studentId}::${log.module}::${log.code}`;
    const current = latest.get(key);
    if (!current || current.date < log.date || (current.date === log.date && current.__index <= index)) {
      latest.set(key, { ...log, __index: index });
    }
  });
  return latest;
}

function getMaterialStatus(studentId, module, code) {
  const entry = Array.from(buildLatestMaterialMap(studentId, module).values()).find((item) => item.code === code);
  return entry ? entry.status : "";
}

function suggestNextMaterials(studentId, module, limit) {
  const used = new Set(Array.from(buildLatestMaterialMap(studentId, module).values()).map((item) => item.code));
  const catalog = getCatalogItems(module, "all").map((item) => item.code);

  if (!used.size) {
    return catalog.slice(0, limit);
  }

  const highestUsedIndex = catalog.reduce((maxIndex, code, index) => (used.has(code) ? index : maxIndex), -1);
  const ordered = catalog.slice(highestUsedIndex + 1).concat(catalog.slice(0, highestUsedIndex + 1));
  return ordered.filter((code) => !used.has(code)).slice(0, limit);
}

function getCatalogItems(module, series) {
  const parts = MODULE_PARTS[module] || [];
  if (module === "external-reading") {
    return parts.map((part) => ({ module, series: "external", code: `外刊精读-${part}` }));
  }
  const seriesList = series === "all" ? MATERIAL_SERIES : MATERIAL_SERIES.filter((item) => item === series);
  const output = [];
  seriesList.forEach((currentSeries) => {
    for (let test = 1; test <= 4; test += 1) {
      parts.forEach((part) => output.push({ module, series: currentSeries, code: `${currentSeries}-Test${test}-${part}` }));
    }
  });
  return output;
}

function normalizeRecords(records) {
  return records.map((record) => ({
    ...record,
    date: record.date || today(),
    startTime: normalizeTime(record.startTime || record.start || ""),
    endTime: normalizeTime(record.endTime || record.end || defaultEndTimeFromDuration(record.startTime || record.start, record.duration)),
    duration: normalizeDuration(record.duration, record.startTime || record.start, record.endTime || record.end),
    status: ["scheduled", "completed", "cancelled"].includes(record.status) ? record.status : "scheduled",
    lessonTags: Array.isArray(record.lessonTags) ? record.lessonTags : [],
    primaryModule: record.primaryModule || record.module || detectMaterialModule(record.completedMaterials?.[0] || record.assignedMaterials?.[0]) || "listening",
    completedMaterials: uniqueList((record.completedMaterials || []).map((code) => normalizeMaterialCode(code))),
    assignedMaterials: uniqueList((record.assignedMaterials || []).map((code) => normalizeMaterialCode(code))),
    writing: normalizeWriting(record.writing),
    homeworkCompletion: Number(record.homeworkCompletion || 0),
    homeworkNote: record.homeworkNote || record.homework || "",
    notes: record.notes || "",
  }));
}

function normalizeStudents(students) {
  return students.map((student) => ({
    ...student,
    exam: normalizeExam(student.exam),
    foundation: normalizeFoundation(student.foundation || student.stage),
    foundationScore: student.foundationScore || "",
    target: normalizeTarget(normalizeExam(student.exam), student.target),
    examDate: student.examDate || "",
    courseMode: normalizeCourseMode(student.courseMode),
    packagePlan: normalizeCourseProduct(normalizeCourseMode(student.courseMode), student.packagePlan),
    packageHours: normalizePackageHours(normalizeCourseMode(student.courseMode), student.packagePlan, student.packageHours),
    assistant: student.assistant || "Polla",
    notes: student.notes || "",
  }));
}

function normalizeMaterialCode(value) {
  const compact = String(value || "").trim().replace(/\s+/g, "");
  if (!compact) {
    return "";
  }

  if (compact.startsWith("外刊精读-")) {
    return compact;
  }

  const readingMatch = compact.toUpperCase().match(/^C(\d+)-?TEST(\d+)-?(PASSAGE\d+)$/);
  if (readingMatch) {
    return `C${Number(readingMatch[1])}-Test${Number(readingMatch[2])}-${capitalizeToken(readingMatch[3])}`;
  }

  const listeningMatch = compact.toUpperCase().match(/^C(\d+)-?TEST(\d+)-?(PART\d+)$/);
  if (listeningMatch) {
    return `C${Number(listeningMatch[1])}-Test${Number(listeningMatch[2])}-${capitalizeToken(listeningMatch[3])}`;
  }

  return compact;
}

function detectMaterialModule(code) {
  if (!code) {
    return "";
  }
  if (/PASSAGE/i.test(code)) {
    return "reading";
  }
  if (/PART/i.test(code)) {
    return "listening";
  }
  if (/外刊精读/i.test(code)) {
    return "external-reading";
  }
  return "";
}

function detectSeriesFromCode(code) {
  const match = String(code || "").match(/^(C\d+)-/i);
  return match ? match[1].toUpperCase() : "";
}

function detectTestFromCode(code) {
  const match = String(code || "").match(/-Test(\d+)/i);
  return match ? match[1] : "";
}

function getLessonTagLabels(tagIds) {
  return (Array.isArray(tagIds) ? tagIds : [])
    .map((tagId) => getAllLessonTags().find((tag) => tag.id === tagId)?.label)
    .filter(Boolean);
}

function getAllLessonTags() {
  return LESSON_TAGS.concat(normalizeLessonTags(state.customLessonTags || []));
}

function normalizeLessonTags(tags) {
  return uniqueList(
    (Array.isArray(tags) ? tags : [])
      .map((tag) => ({
        id: String(tag.id || "").trim(),
        label: String(tag.label || "").trim(),
        group: String(tag.group || "自定义").trim() || "自定义",
      }))
      .filter((tag) => tag.id && tag.label)
      .map((tag) => JSON.stringify(tag)),
  ).map((item) => JSON.parse(item));
}

function renderCourseBadge(courseMode) {
  const mode = normalizeCourseMode(courseMode);
  const className = mode === "雅思班课" ? "is-class" : "is-one-on-one";
  const label = mode === "雅思班课" ? "班课" : "1v1";
  return `<span class="course-badge ${className}">${label}</span>`;
}

function compactMaterialText(materials) {
  if (!materials || !materials.length) {
    return "无";
  }
  if (materials.length <= 2) {
    return materials.join(" · ");
  }
  return `${materials.slice(0, 2).join(" · ")} 等 ${materials.length} 项`;
}

function formatWritingText(writing) {
  const normalized = normalizeWriting(writing);
  const pieces = [];
  if (normalized.task1Types.length) {
    pieces.push(`Task1 ${normalized.task1Types.join(" / ")}`);
  }
  if (normalized.task2Types.length) {
    pieces.push(`Task2 ${normalized.task2Types.join(" / ")}`);
  }
  if (normalized.note) {
    pieces.push(normalized.note);
  }
  return pieces.length ? pieces.join(" · ") : "无";
}

function uniqueList(list) {
  return Array.from(new Set(list.filter(Boolean)));
}

function normalizeExam(value) {
  return Object.keys(EXAM_CONFIG).includes(value) ? value : "IELTS";
}

function normalizeTarget(exam, value) {
  const options = EXAM_CONFIG[normalizeExam(exam)] || EXAM_CONFIG.IELTS;
  if (options.includes(String(value))) {
    return String(value);
  }
  const matched = String(value || "").match(/(\d+(?:\.\d+)?)/);
  if (matched && options.includes(matched[1])) {
    return matched[1];
  }
  return options[Math.min(2, options.length - 1)];
}

function normalizeFoundation(value) {
  if (FOUNDATION_OPTIONS.includes(value)) {
    return value;
  }
  if (String(value || "").includes("零")) {
    return "零基础";
  }
  if (String(value || "").includes("薄")) {
    return "薄弱";
  }
  if (String(value || "").includes("稳")) {
    return "较稳";
  }
  if (String(value || "").includes("冲")) {
    return "冲分";
  }
  return FOUNDATION_OPTIONS[2];
}

function resolveTargetIndex(exam, target) {
  const options = EXAM_CONFIG[normalizeExam(exam)] || EXAM_CONFIG.IELTS;
  return Math.max(options.indexOf(normalizeTarget(exam, target)), 0);
}

function normalizeCourseMode(value) {
  if (COURSE_MODE_OPTIONS.includes(value)) {
    return value;
  }
  const input = String(value || "");
  if (input.includes("班")) {
    return "雅思班课";
  }
  if (input.includes("1v1") || input.includes("一对一")) {
    return "雅思1v1";
  }
  return COURSE_MODE_OPTIONS[0];
}

function getCourseProducts(courseMode) {
  return COURSE_PRODUCTS[normalizeCourseMode(courseMode)] || COURSE_PRODUCTS[COURSE_MODE_OPTIONS[0]];
}

function getCourseProduct(courseMode, packagePlan) {
  const products = getCourseProducts(courseMode);
  return products.find((item) => item.value === packagePlan || item.label === packagePlan) || products[0];
}

function normalizeCourseProduct(courseMode, packagePlan) {
  return getCourseProduct(courseMode, packagePlan).value;
}

function normalizePackageHours(courseMode, packagePlan, fallback) {
  const product = getCourseProduct(courseMode, packagePlan);
  if (product.hours) {
    return product.hours;
  }
  return normalizePackageHoursInput(fallback);
}

function normalizePackageHoursInput(value) {
  const matched = String(value || "").match(/\d+/);
  return matched ? matched[0] : "";
}

function normalizeWriting(writing) {
  const source = writing && typeof writing === "object" ? writing : {};
  return {
    task1Types: uniqueList((source.task1Types || []).filter((item) => WRITING_TASK_TYPES.task1.includes(item))),
    task2Types: uniqueList((source.task2Types || []).filter((item) => WRITING_TASK_TYPES.task2.includes(item))),
    note: source.note || "",
  };
}

function clampIndex(index, length) {
  return Math.max(0, Math.min(length - 1, Number.isFinite(index) ? index : 0));
}

function capitalizeToken(token) {
  return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
}

function sumHours(records) {
  return records.reduce((sum, record) => sum + Number(record.duration || 0), 0);
}

function formatHours(hours) {
  const normalized = Number(hours || 0);
  return normalized % 1 === 0 ? `${normalized}h` : `${normalized.toFixed(1)}h`;
}

function normalizeDuration(duration, startTime, endTime) {
  const byTime = calculateDurationHours(startTime, endTime);
  if (byTime > 0) {
    return byTime;
  }
  const numeric = Number(duration || 0);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : 0;
}

function normalizeTime(value) {
  const match = String(value || "").match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    return "";
  }
  return `${String(Number(match[1])).padStart(2, "0")}:${match[2]}`;
}

function defaultEndTimeFromDuration(startTime, duration) {
  const startMinutes = timeToMinutes(startTime);
  const numeric = Number(duration || 0);
  if (!Number.isFinite(startMinutes) || !Number.isFinite(numeric) || numeric <= 0) {
    return "";
  }
  const endMinutes = Math.min(startMinutes + Math.round(numeric * 60), 24 * 60);
  return minutesToTime(endMinutes);
}

function timeToMinutes(value) {
  const normalized = normalizeTime(value);
  if (!normalized) {
    return NaN;
  }
  const [hours, minutes] = normalized.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(value) {
  const total = Math.max(0, Math.min(24 * 60, Math.round(Number(value) || 0)));
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function calculateDurationHours(startTime, endTime) {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return 0;
  }
  return Number(((end - start) / 60).toFixed(2));
}

function calculateTimeWeightPosition(startTime, endTime) {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  const dayStart = 8 * 60;
  const dayEnd = 24 * 60;
  const range = dayEnd - dayStart;
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return { left: 0, width: 0 };
  }
  const clampedStart = Math.max(dayStart, Math.min(dayEnd, start));
  const clampedEnd = Math.max(dayStart, Math.min(dayEnd, end));
  return {
    left: ((clampedStart - dayStart) / range) * 100,
    width: Math.max(((clampedEnd - clampedStart) / range) * 100, 2.4),
  };
}

function saveMemo() {
  state.memo = els.memoInput.value.trim();
  state.weekNote = els.weekNoteInput.value.trim();
  state.todoNote = els.todoInput.value.trim();
  persist();
  renderSummary();
  renderDashboard();
  renderDashboardWeekPreview();
}

function saveDashboardNotes() {
  saveMemo();
}

function getManualTodoItems() {
  return String(state.todoNote || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({
      title: line,
      detail: "手动待处理",
    }));
}

function getWeekStart(date) {
  const current = new Date(`${date || today()}T00:00:00`);
  const day = current.getDay() || 7;
  current.setDate(current.getDate() - day + 1);
  return current.toISOString().slice(0, 10);
}

function shiftDate(date, deltaDays) {
  const current = new Date(`${date}T00:00:00`);
  current.setDate(current.getDate() + deltaDays);
  return current.toISOString().slice(0, 10);
}

function getWeekDays(anchorDate) {
  const start = getWeekStart(anchorDate || today());
  return Array.from({ length: 7 }, (_, index) => shiftDate(start, index));
}

function getMonthCalendarDays(anchorDate) {
  const month = normalizeScheduleAnchor(anchorDate).slice(0, 7);
  const firstDay = `${month}-01`;
  const first = new Date(`${firstDay}T00:00:00`);
  const leadingDays = (first.getDay() || 7) - 1;
  const nextMonth = new Date(first);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(0);
  const daysInMonth = nextMonth.getDate();
  const totalCells = Math.ceil((leadingDays + daysInMonth) / 7) * 7;
  return Array.from({ length: totalCells }, (_, index) => {
    const date = shiftDate(firstDay, index - leadingDays);
    return {
      date,
      inMonth: date.startsWith(month),
    };
  });
}

function getRecordsByDate(date) {
  return [...state.records]
    .filter((record) => record.date === date)
    .sort((left, right) => (left.startTime || "").localeCompare(right.startTime || ""));
}

function normalizeScheduleAnchor(value) {
  const input = String(value || "").trim();
  if (/^\d{4}-\d{2}$/.test(input)) {
    return `${input}-01`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return input;
  }
  return today();
}

function normalizeSelectedScheduleDate(month) {
  const selected = state.ui.selectedScheduleDate || state.ui.scheduleAnchorDate || today();
  if (selected.startsWith(month)) {
    return selected;
  }
  const todayDate = today();
  return todayDate.startsWith(month) ? todayDate : `${month}-01`;
}

function formatMonthTitle(month) {
  const [year, monthNumber] = month.split("-");
  return `${year}年${Number(monthNumber)}月`;
}

function getWeekRecords(anchorDate) {
  const weekDays = new Set(getWeekDays(anchorDate || today()));
  return [...state.records]
    .filter((record) => weekDays.has(record.date))
    .sort((left, right) => {
      const dateCompare = left.date.localeCompare(right.date);
      if (dateCompare !== 0) {
        return dateCompare;
      }
      return (left.startTime || "").localeCompare(right.startTime || "");
    });
}

function formatWeekday(date, short = false) {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    weekday: short ? "short" : "long",
    month: short ? undefined : "numeric",
    day: short ? undefined : "numeric",
  });
  return formatter.format(new Date(`${date}T00:00:00`));
}

function getStudentById(id) {
  return state.students.find((student) => student.id === id);
}

function upsert(collection, payload) {
  const index = collection.findIndex((item) => item.id === payload.id);
  if (index >= 0) {
    collection[index] = payload;
  } else {
    collection.push(payload);
  }
}

function bindActionButtons(container, actionMap) {
  container.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = actionMap[button.dataset.action];
      if (action) {
        action(button.dataset.id);
      }
    });
  });
}

function switchTab(tabId) {
  activeTab = tabId;
  document.querySelectorAll(".tab-btn").forEach((button) => button.classList.toggle("active", button.dataset.tab === tabId));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === tabId));
}

function handleQuickAction(event) {
  const trigger = event.target.closest("[data-quick-target], [data-quick-trigger]");
  if (!trigger) {
    return;
  }
  if (trigger.dataset.quickTrigger === "student-import") {
    els.studentExcelInput.click();
    return;
  }
  const target = trigger.dataset.quickTarget;
  if (!target) {
    return;
  }
  switchTab(target);
  if (target === "students") {
    els.studentName.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  if (target === "records") {
    els.recordStudent.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  if (target === "schedule") {
    els.scheduleAnchorDate.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

function formatStatus(status) {
  return (
    {
      scheduled: "已排课",
      completed: "已完成",
      cancelled: "已取消",
    }[status] || status
  );
}

function loadState() {
  const saved = safelyParse(window.localStorage.getItem(STORAGE_KEY));
  const legacy = LEGACY_STORAGE_KEYS.map((key) => safelyParse(window.localStorage.getItem(key))).find(Boolean);
  const source = saved || legacy || {};

  return {
    students: normalizeStudents(Array.isArray(source.students) ? source.students : []),
    records: normalizeRecords(Array.isArray(source.records) ? source.records : []),
    materialLogs: Array.isArray(source.materialLogs) ? source.materialLogs : [],
    customLessonTags: normalizeLessonTags(source.customLessonTags),
    memo: source.memo || "",
    weekNote: source.weekNote || "",
    todoNote: source.todoNote || "",
    ui: {
      selectedMonth: source.ui?.selectedMonth || todayMonth(),
      selectedStudentId: source.ui?.selectedStudentId || "",
      trackerStudentId: source.ui?.trackerStudentId || "",
      trackerSeries: source.ui?.trackerSeries || "all",
      scheduleAnchorDate: source.ui?.scheduleAnchorDate || today(),
      selectedScheduleDate: source.ui?.selectedScheduleDate || source.ui?.scheduleAnchorDate || today(),
    },
  };
}

function safelyParse(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
}

function persist() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function todayMonth() {
  return new Date().toISOString().slice(0, 7);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
