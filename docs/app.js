const STORAGE_KEY = "language-teaching-assistant-v3";
const CLOUD_STORAGE_KEY = "language-teaching-assistant-cloud-v1";
const LEGACY_STORAGE_KEYS = ["language-teaching-assistant-v2", "language-teaching-assistant-v1"];
const CLOUD_TABLE = "app_snapshots";
const CLOUD_SNAPSHOT_KEY = "teacher-default";
const DEFAULT_SUPABASE_URL = "";
const DEFAULT_SUPABASE_ANON_KEY = "";
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
const TRIAL_SOURCES = ["转介绍", "社媒", "老学员", "校区咨询", "其他"];
const TRIAL_STATUS_LABELS = {
  scheduled: "已预约",
  completed: "已试听",
  "no-show": "爽约",
  cancelled: "取消",
  converted: "已转正",
  paused: "暂不跟进",
};
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
const LESSON_FOCUS_OPTIONS = [
  {
    id: "listening",
    label: "听力",
    groups: ["听力", "复盘", "自定义"],
    module: "listening",
    hint: "适合精听、定位、填空和选择题拆解。用了题号再补教材模块即可。",
  },
  {
    id: "reading",
    label: "阅读",
    groups: ["阅读", "复盘", "自定义"],
    module: "reading",
    hint: "适合段落匹配、判断题、定位和外刊精读。只记录这节课真正讲到的阅读任务。",
  },
  {
    id: "writing",
    label: "写作",
    groups: ["写作", "复盘", "自定义"],
    module: "",
    hint: "如果这节课主要讲写作，核心内容和写作补充通常就够了，其他区域可以直接跳过。",
  },
  {
    id: "speaking",
    label: "口语",
    groups: ["口语", "复盘", "自定义"],
    module: "",
    hint: "口语课通常不用强行记录题号，直接把课堂重点和课后练习写清楚最省事。",
  },
  {
    id: "mixed",
    label: "综合",
    groups: null,
    module: "",
    hint: "适合一节课里穿插多个板块的情况，只填这次实际推进到的内容即可。",
  },
  {
    id: "mock",
    label: "模考讲评",
    groups: null,
    module: "",
    hint: "适合整套讲评、错题复盘和提分策略课。核心内容里补一句课堂结论会最清楚。",
  },
  {
    id: "review",
    label: "作业讲评",
    groups: ["复盘", "写作", "听力", "阅读", "口语", "自定义"],
    module: "",
    hint: "适合作业订正、作文批改和错题回看。可以只写讲评重点和新的课后要求。",
  },
];

const state = loadState();
const cloudState = loadCloudState();
const draftRecord = {
  lessonTags: [],
  completedMaterials: [],
  assignedMaterials: [],
  writingTask1Types: [],
  writingTask2Types: [],
};
const RECORD_COLLAPSIBLE_SECTIONS = [
  "interaction",
  "lesson-tags",
  "materials",
  "preview",
  "writing",
  "suggestions",
  "homework",
  "feedback",
  "notes",
];
let activeTab = "dashboard";
let cloudPushTimer = null;
let cloudSyncPaused = false;
let recordSectionState = {};
let recordSaveStatusTimer = null;

const els = {
  summaryGrid: document.getElementById("summaryGrid"),
  monthPicker: document.getElementById("monthPicker"),
  monthlyHours: document.getElementById("monthlyHours"),
  teacherOverviewPanel: document.getElementById("teacherOverviewPanel"),
  rewardPanel: document.getElementById("rewardPanel"),
  trialOverviewPanel: document.getElementById("trialOverviewPanel"),
  cloudUrl: document.getElementById("cloudUrl"),
  cloudAnonKey: document.getElementById("cloudAnonKey"),
  cloudEmail: document.getElementById("cloudEmail"),
  cloudPassword: document.getElementById("cloudPassword"),
  saveCloudConfigBtn: document.getElementById("saveCloudConfigBtn"),
  cloudSignUpBtn: document.getElementById("cloudSignUpBtn"),
  cloudLoginBtn: document.getElementById("cloudLoginBtn"),
  cloudPullBtn: document.getElementById("cloudPullBtn"),
  cloudPushBtn: document.getElementById("cloudPushBtn"),
  cloudLogoutBtn: document.getElementById("cloudLogoutBtn"),
  cloudStatusBadge: document.getElementById("cloudStatusBadge"),
  cloudSummaryText: document.getElementById("cloudSummaryText"),
  cloudStatusText: document.getElementById("cloudStatusText"),
  toggleCloudPanelBtn: document.getElementById("toggleCloudPanelBtn"),
  cloudPanel: document.getElementById("cloudPanel"),
  cloudPanelBody: document.getElementById("cloudPanelBody"),
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
  studentClassNameField: document.getElementById("studentClassNameField"),
  studentClassName: document.getElementById("studentClassName"),
  classNameSuggestions: document.getElementById("classNameSuggestions"),
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
  recordTargetMeta: document.getElementById("recordTargetMeta"),
  recordSectionSummary: document.getElementById("recordSectionSummary"),
  collapseRecordSectionsBtn: document.getElementById("collapseRecordSectionsBtn"),
  recordLessonFocus: document.getElementById("recordLessonFocus"),
  recordLessonFocusPicker: document.getElementById("recordLessonFocusPicker"),
  recordLessonSummary: document.getElementById("recordLessonSummary"),
  recordFocusHint: document.getElementById("recordFocusHint"),
  recordTeacherPrompt: document.getElementById("recordTeacherPrompt"),
  recordStudentResponse: document.getElementById("recordStudentResponse"),
  recordNextGuidance: document.getElementById("recordNextGuidance"),
  recordStartTime: document.getElementById("recordStartTime"),
  recordEndTime: document.getElementById("recordEndTime"),
  recordDurationDisplay: document.getElementById("recordDurationDisplay"),
  recordTimeWeightBar: document.getElementById("recordTimeWeightBar"),
  recordHomeworkCompletion: document.getElementById("recordHomeworkCompletion"),
  recordHomeworkNote: document.getElementById("recordHomeworkNote"),
  recordFeedbackPreview: document.getElementById("recordFeedbackPreview"),
  copyRecordFeedbackBtn: document.getElementById("copyRecordFeedbackBtn"),
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
  saveAndCopyRecordBtn: document.getElementById("saveAndCopyRecordBtn"),
  recordSaveStatus: document.getElementById("recordSaveStatus"),
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
  scheduleInsightPanel: document.getElementById("scheduleInsightPanel"),
  scheduleWeekHeader: document.getElementById("scheduleWeekHeader"),
  scheduleBoard: document.getElementById("scheduleBoard"),
  scheduleAgenda: document.getElementById("scheduleAgenda"),
  classCohortPanel: document.getElementById("classCohortPanel"),
  trialPipelinePanel: document.getElementById("trialPipelinePanel"),
  trialList: document.getElementById("trialList"),
  exportBtn: document.getElementById("exportBtn"),
  trialExportBtn: document.getElementById("trialExportBtn"),
  dashboardTrialExportBtn: document.getElementById("dashboardTrialExportBtn"),
  openTrialModalBtn: document.getElementById("openTrialModalBtn"),
  dashboardTrialCreateBtn: document.getElementById("dashboardTrialCreateBtn"),
  scheduleTrialCreateBtn: document.getElementById("scheduleTrialCreateBtn"),
  scheduleTrialCreateSecondaryBtn: document.getElementById("scheduleTrialCreateSecondaryBtn"),
  trialModal: document.getElementById("trialModal"),
  trialModalBackdrop: document.getElementById("trialModalBackdrop"),
  closeTrialModalBtn: document.getElementById("closeTrialModalBtn"),
  trialForm: document.getElementById("trialForm"),
  trialId: document.getElementById("trialId"),
  trialName: document.getElementById("trialName"),
  trialContact: document.getElementById("trialContact"),
  trialSource: document.getElementById("trialSource"),
  trialExam: document.getElementById("trialExam"),
  trialFoundation: document.getElementById("trialFoundation"),
  trialTarget: document.getElementById("trialTarget"),
  trialDate: document.getElementById("trialDate"),
  trialMode: document.getElementById("trialMode"),
  trialStartTime: document.getElementById("trialStartTime"),
  trialEndTime: document.getElementById("trialEndTime"),
  trialStatus: document.getElementById("trialStatus"),
  trialFollowUpDate: document.getElementById("trialFollowUpDate"),
  trialFeedback: document.getElementById("trialFeedback"),
  trialNotes: document.getElementById("trialNotes"),
  cancelTrialBtn: document.getElementById("cancelTrialBtn"),
  resetTrialBtn: document.getElementById("resetTrialBtn"),
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
  void hydrateFromCloudIfNeeded();
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
  if (!state.ui.recordTargetValue) {
    state.ui.recordTargetValue = getDefaultRecordTargetValue(state.ui.selectedStudentId);
  }
  if (typeof state.ui.cloudPanelExpanded !== "boolean") {
    state.ui.cloudPanelExpanded = !hasCloudSession();
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
  els.saveCloudConfigBtn.addEventListener("click", saveCloudConfig);
  els.cloudSignUpBtn.addEventListener("click", handleCloudSignUp);
  els.cloudLoginBtn.addEventListener("click", handleCloudLogin);
  els.cloudPullBtn.addEventListener("click", () => void pullStateFromCloud({ notify: true, overwriteLocal: true }));
  els.cloudPushBtn.addEventListener("click", () => void pushStateToCloud({ notify: true }));
  els.cloudLogoutBtn.addEventListener("click", handleCloudLogout);
  els.toggleCloudPanelBtn.addEventListener("click", toggleCloudPanel);

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
  els.recordForm.addEventListener("input", renderCourseFeedbackPreview);
  els.recordForm.addEventListener("change", renderCourseFeedbackPreview);
  els.recordForm.addEventListener("click", handleRecordSectionClick);
  els.resetRecordBtn.addEventListener("click", resetRecordForm);
  els.copyRecordFeedbackBtn.addEventListener("click", copyCurrentRecordFeedback);
  els.collapseRecordSectionsBtn.addEventListener("click", collapseOptionalRecordSections);
  els.recordStartTime.addEventListener("input", syncRecordTimeSection);
  els.recordEndTime.addEventListener("input", syncRecordTimeSection);
  els.recordStudent.addEventListener("change", () => {
    const target = getTeachingTargetByValue(els.recordStudent.value);
    state.ui.recordTargetValue = els.recordStudent.value;
    if (target?.type === "student") {
      state.ui.selectedStudentId = target.studentId;
      state.ui.trackerStudentId = target.studentId;
    }
    persist();
    renderDashboard();
    renderRecordTargetMeta();
    renderRecordSuggestions();
    renderCourseFeedbackPreview();
  });
  els.recordLessonFocusPicker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lesson-focus]");
    if (!button) {
      return;
    }
    setRecordLessonFocus(button.dataset.lessonFocus, { syncModule: true });
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
  [els.trialExportBtn, els.dashboardTrialExportBtn].forEach((button) =>
    button?.addEventListener("click", exportTrialData),
  );
  [
    els.openTrialModalBtn,
    els.dashboardTrialCreateBtn,
    els.scheduleTrialCreateBtn,
    els.scheduleTrialCreateSecondaryBtn,
  ].forEach((button) =>
    button?.addEventListener("click", () => openTrialModal({ forceReset: true })),
  );
  els.closeTrialModalBtn.addEventListener("click", closeTrialModal);
  els.cancelTrialBtn.addEventListener("click", closeTrialModal);
  els.trialModalBackdrop.addEventListener("click", closeTrialModal);
  els.trialForm.addEventListener("submit", handleTrialSubmit);
  els.resetTrialBtn.addEventListener("click", resetTrialForm);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !els.trialModal.hidden) {
      closeTrialModal();
    }
  });
  els.importInput.addEventListener("change", importData);
  els.seedDemoBtn.addEventListener("click", loadDemoData);
}

function renderAll() {
  renderSummary();
  renderStudentOptions();
  renderSeriesOptions();
  renderStudentControls();
  renderCloudPanel();
  renderDashboard();
  renderDashboardWeekPreview();
  renderStudents();
  renderRecordComposer();
  renderRecords();
  renderSchedule();
  renderTrialList();
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
  renderClassNameSuggestions();
  renderStudentClassField();
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
  renderStudentClassField();
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

function renderClassNameSuggestions() {
  if (!els.classNameSuggestions) {
    return;
  }
  const classNames = getAllClassNames();
  els.classNameSuggestions.innerHTML = classNames.map((name) => `<option value="${escapeHtml(name)}"></option>`).join("");
}

function renderStudentClassField() {
  const isClass = normalizeCourseMode(els.studentCourseMode.value) === "雅思班课";
  els.studentClassNameField.hidden = !isClass;
  els.studentClassName.disabled = !isClass;
  if (!isClass) {
    els.studentClassName.value = "";
  }
}

function getAllClassNames(students = state.students) {
  return uniqueList(
    students
      .map((student) => String(student.className || "").trim())
      .filter(Boolean),
  ).sort((left, right) => left.localeCompare(right, "zh-CN"));
}

function encodeTeachingTargetValue(target) {
  return target.type === "class" ? `class:${encodeURIComponent(target.className)}` : `student:${target.studentId}`;
}

function parseTeachingTargetValue(value) {
  const input = String(value || "");
  if (input.startsWith("class:")) {
    return { type: "class", className: decodeURIComponent(input.slice(6)) };
  }
  if (input.startsWith("student:")) {
    return { type: "student", studentId: input.slice(8) };
  }
  return { type: "student", studentId: input };
}

function getClassTargets(students = state.students) {
  const groups = new Map();
  students.forEach((student) => {
    if (normalizeCourseMode(student.courseMode) !== "雅思班课") {
      return;
    }
    const className = String(student.className || "").trim();
    if (!className) {
      return;
    }
    const existing = groups.get(className) || [];
    existing.push(student);
    groups.set(className, existing);
  });
  return Array.from(groups.entries())
    .map(([className, members]) => ({
      type: "class",
      className,
      participantIds: members.map((student) => student.id),
      participantNames: members.map((student) => student.name),
      courseMode: "雅思班课",
      label: `${className}（${members.length}人）`,
      value: `class:${encodeURIComponent(className)}`,
    }))
    .sort((left, right) => left.className.localeCompare(right.className, "zh-CN"));
}

function getTeachingTargets(students = state.students) {
  const classTargets = getClassTargets(students);
  const classMemberIds = new Set(classTargets.flatMap((target) => target.participantIds));
  const individualTargets = students
    .filter((student) => !classMemberIds.has(student.id))
    .map((student) => ({
      type: "student",
      studentId: student.id,
      participantIds: [student.id],
      participantNames: [student.name],
      className: student.className || "",
      courseMode: normalizeCourseMode(student.courseMode),
      label:
        normalizeCourseMode(student.courseMode) === "雅思班课" && student.className
          ? `${student.name}（${student.className}）`
          : student.name,
      value: `student:${student.id}`,
    }))
    .sort((left, right) => left.label.localeCompare(right.label, "zh-CN"));
  return individualTargets.concat(classTargets);
}

function getTeachingTargetByValue(value, students = state.students) {
  const parsed = parseTeachingTargetValue(value);
  if (parsed.type === "class") {
    return getClassTargets(students).find((target) => target.className === parsed.className) || null;
  }
  const student = students.find((item) => item.id === parsed.studentId);
  if (!student) {
    return null;
  }
  return {
    type: "student",
    studentId: student.id,
    participantIds: [student.id],
    participantNames: [student.name],
    className: student.className || "",
    courseMode: normalizeCourseMode(student.courseMode),
    label: student.name,
    value: `student:${student.id}`,
  };
}

function getDefaultRecordTargetValue(selectedStudentId = state.ui.selectedStudentId) {
  const targets = getTeachingTargets();
  if (!targets.length) {
    return "";
  }
  const selected = selectedStudentId ? getStudentById(selectedStudentId) : null;
  if (selected) {
    if (normalizeCourseMode(selected.courseMode) === "雅思班课" && selected.className) {
      const classTarget = targets.find((target) => target.type === "class" && target.className === selected.className);
      if (classTarget) {
        return classTarget.value;
      }
    }
    const personalTarget = targets.find((target) => target.type === "student" && target.studentId === selected.id);
    if (personalTarget) {
      return personalTarget.value;
    }
  }
  return targets[0].value;
}

function resolveRecordTargetValue(targets = getTeachingTargets()) {
  if (!targets.length) {
    return "";
  }
  const existing = state.ui.recordTargetValue;
  if (existing && targets.some((target) => target.value === existing)) {
    return existing;
  }
  return getDefaultRecordTargetValue(state.ui.selectedStudentId);
}

function getNormalizedParticipantIds(participantIds, students = state.students, className = "", fallbackStudentId = "") {
  const validIds = new Set(students.map((student) => student.id));
  const explicit = uniqueList((Array.isArray(participantIds) ? participantIds : []).map((id) => String(id || "").trim())).filter((id) =>
    validIds.has(id),
  );
  if (explicit.length) {
    return explicit;
  }
  if (className) {
    const classMembers = students
      .filter((student) => normalizeCourseMode(student.courseMode) === "雅思班课" && String(student.className || "").trim() === className)
      .map((student) => student.id);
    if (classMembers.length) {
      return classMembers;
    }
  }
  return fallbackStudentId && validIds.has(fallbackStudentId) ? [fallbackStudentId] : [];
}

function getRecordTarget(record) {
  if (!record) {
    return null;
  }
  if (record.targetType === "class" || record.className) {
    const className = String(record.className || "").trim() || "未命名班课";
    const participantIds = getNormalizedParticipantIds(record.participantIds, state.students, className, record.studentId);
    const participantNames = participantIds.map((id) => getStudentById(id)?.name).filter(Boolean);
    return {
      type: "class",
      className,
      participantIds,
      participantNames,
      courseMode: "雅思班课",
      label: className,
      value: `class:${encodeURIComponent(className)}`,
    };
  }
  const student = getStudentById(record.studentId);
  if (!student) {
    return null;
  }
  return {
    type: "student",
    studentId: student.id,
    participantIds: [student.id],
    participantNames: [student.name],
    className: student.className || "",
    courseMode: normalizeCourseMode(student.courseMode),
    label: student.name,
    value: `student:${student.id}`,
  };
}

function getRecordTargetValue(record) {
  return getRecordTarget(record)?.value || "";
}

function getRecordDisplayName(record) {
  return getRecordTarget(record)?.label || "未找到授课对象";
}

function getRecordParticipantNames(record) {
  return getRecordTarget(record)?.participantNames || [];
}

function getRecordCourseMode(record) {
  return getRecordTarget(record)?.courseMode || "雅思1v1";
}

function getRecordTargetKey(record) {
  const target = getRecordTarget(record);
  if (!target) {
    return "";
  }
  return target.type === "class" ? `class:${target.className}` : `student:${target.studentId}`;
}

function getLessonFocusConfig(value) {
  return LESSON_FOCUS_OPTIONS.find((item) => item.id === normalizeLessonFocus(value)) || LESSON_FOCUS_OPTIONS[4];
}

function normalizeLessonFocus(value, primaryModule = "", writing = null, lessonTags = [], lessonTagCatalog = LESSON_TAGS) {
  if (LESSON_FOCUS_OPTIONS.some((item) => item.id === value)) {
    return value;
  }
  const tagGroups = (Array.isArray(lessonTags) ? lessonTags : [])
    .map((tagId) => lessonTagCatalog.find((tag) => tag.id === tagId)?.group)
    .filter(Boolean);
  if (writing && (Array.isArray(writing.task1Types) && writing.task1Types.length || Array.isArray(writing.task2Types) && writing.task2Types.length || writing.note)) {
    return "writing";
  }
  if (tagGroups.includes("口语")) {
    return "speaking";
  }
  if (tagGroups.includes("复盘")) {
    return "review";
  }
  if (primaryModule === "listening") {
    return "listening";
  }
  if (primaryModule === "reading" || primaryModule === "external-reading") {
    return "reading";
  }
  return "mixed";
}

function getFilteredLessonTags() {
  const focus = getLessonFocusConfig(els.recordLessonFocus.value);
  const lessonTags = getAllLessonTags();
  if (!focus.groups) {
    return lessonTags;
  }
  return lessonTags.filter((tag) => focus.groups.includes(tag.group));
}

function renderSummary() {
  const monthRecords = getRecordsByMonth(state.ui.selectedMonth);
  const totalTeacherHours = sumHours(monthRecords.filter((record) => record.status !== "cancelled"));
  const completedHours = sumHours(monthRecords.filter((record) => record.status === "completed"));
  const scheduledHours = sumHours(monthRecords.filter((record) => record.status === "scheduled"));
  const cancelledHours = sumHours(monthRecords.filter((record) => record.status === "cancelled"));
  const trialStats = getTrialStats(state.ui.selectedMonth);
  const followUpCount = buildFollowUps().length + getManualTodoItems().length + trialStats.followUpCount;
  const activeStudents = new Set(monthRecords.map((record) => getRecordTargetKey(record)).filter(Boolean)).size;

  const cards = [
    { label: "教师总课时", value: formatHours(totalTeacherHours), note: "本月全部未取消授课" },
    { label: "已完成授课", value: formatHours(completedHours), note: "已经真实发生的课时" },
    { label: "待上课时", value: formatHours(scheduledHours), note: `${activeStudents} 个授课对象仍在排课中` },
    { label: "待处理", value: String(followUpCount), note: `取消 ${formatHours(cancelledHours)} / 含 ${trialStats.followUpCount} 位试听待跟进` },
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

function renderCloudPanel() {
  els.cloudUrl.value = cloudState.url || "";
  els.cloudAnonKey.value = cloudState.anonKey || "";
  els.cloudEmail.value = cloudState.email || "";
  els.cloudStatusBadge.textContent = getCloudBadgeLabel();
  els.cloudSummaryText.textContent = getCloudSummaryText();
  els.cloudStatusText.textContent = getCloudStatusText();
  const connected = hasCloudSession();
  els.cloudPullBtn.disabled = !connected;
  els.cloudPushBtn.disabled = !connected;
  els.cloudLogoutBtn.disabled = !connected;
  els.cloudPanel.classList.toggle("is-collapsed", !state.ui.cloudPanelExpanded);
  els.toggleCloudPanelBtn.textContent = state.ui.cloudPanelExpanded ? "收起" : "展开";
}

function renderDashboard() {
  els.monthPicker.value = state.ui.selectedMonth;
  const monthRecords = getRecordsByMonth(state.ui.selectedMonth);
  const groupedHours = groupHoursByStudent(monthRecords);
  const totalTeacherHours = sumHours(monthRecords.filter((record) => record.status !== "cancelled"));
  const completedHours = sumHours(monthRecords.filter((record) => record.status === "completed"));
  const scheduledHours = sumHours(monthRecords.filter((record) => record.status === "scheduled"));
  const cancelledHours = sumHours(monthRecords.filter((record) => record.status === "cancelled"));
  const activeStudents = new Set(monthRecords.map((record) => getRecordTargetKey(record)).filter(Boolean)).size;
  const rewardProgress = Math.min((totalTeacherHours / 80) * 100, 100);
  const rewardRemaining = Math.max(80 - totalTeacherHours, 0);
  const trialStats = getTrialStats(state.ui.selectedMonth);

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
          <span class="tag">${activeStudents} 个授课对象</span>
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

  els.trialOverviewPanel.innerHTML = `
    <div class="focus-card">
      <div class="mini-grid">
        <div class="trial-stat">
          <strong>${trialStats.total}</strong>
          <span>本月试听人数</span>
        </div>
        <div class="trial-stat">
          <strong>${trialStats.scheduled}</strong>
          <span>待试听</span>
        </div>
        <div class="trial-stat">
          <strong>${trialStats.completed}</strong>
          <span>已试听</span>
        </div>
        <div class="trial-stat">
          <strong>${trialStats.converted}</strong>
          <span>已转正</span>
        </div>
      </div>
      <div class="tracker-summary">
        <span class="tag">转化率 ${trialStats.conversionRate}</span>
        <span class="tag">试听总时长 ${formatHours(trialStats.hours)}</span>
        <span class="tag">爽约 ${trialStats.noShow}</span>
        <span class="tag">取消 ${trialStats.cancelled}</span>
        <span class="tag">待跟进 ${trialStats.followUpCount}</span>
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
  const weekTrials = getWeekTrials(state.ui.scheduleAnchorDate);
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
      detail: `${getRecordDisplayName(record)} · ${formatHours(record.duration || 0)} · ${formatStatus(record.status)}`,
    })),
    weekTrials.slice(0, 3).map((trial) => ({
      title: `${formatWeekday(trial.date)} · ${trial.startTime || "--:--"}-${trial.endTime || "--:--"}`,
      detail: `试听 ${trial.name} · ${formatTrialStatus(trial.status)} · ${trial.mode}`,
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
      const isClassStudent = normalizeCourseMode(student.courseMode) === "雅思班课";
      return `
        <div class="stack-item ${isCurrent ? "is-current" : ""}">
          <div class="student-title">
            <h3>${escapeHtml(student.name)}</h3>
            ${renderCourseBadge(student.courseMode)}
          </div>
          <div class="stack-meta">
            ${escapeHtml(student.exam || "IELTS")} · ${escapeHtml(student.foundation || "中等")} ${student.foundationScore ? `(${escapeHtml(student.foundationScore)})` : ""} · 目标 ${escapeHtml(student.target || "6.5")}<br />
            考试日期：${escapeHtml(student.examDate || "待定")}<br />
            ${escapeHtml(student.courseMode || "雅思1v1")} · ${escapeHtml(student.packagePlan || "雅思1v1")} · ${student.packageHours ? `${escapeHtml(student.packageHours)}h` : "未填课时"}${student.className ? ` · 班级：${escapeHtml(student.className)}` : ""}<br />
            助教：${escapeHtml(student.assistant || "未匹配")} · 待完成：${pending}
          </div>
          <div class="stack-actions">
            <button class="ghost-btn" data-action="focus-student" data-id="${student.id}">设为当前</button>
            <button class="ghost-btn" data-action="open-record-student" data-id="${student.id}">${isClassStudent ? "去录班课" : "去录课"}</button>
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
  const targets = getTeachingTargets();
  const selectedTargetValue = resolveRecordTargetValue(targets);
  if (targets.length) {
    const individualTargets = targets.filter((target) => target.type === "student");
    const classTargets = targets.filter((target) => target.type === "class");
    const parts = [];
    if (individualTargets.length) {
      parts.push(
        `<optgroup label="个人课程">${individualTargets
          .map((target) => `<option value="${target.value}">${escapeHtml(target.label)}</option>`)
          .join("")}</optgroup>`,
      );
    }
    if (classTargets.length) {
      parts.push(
        `<optgroup label="班课">${classTargets
          .map((target) => `<option value="${target.value}">${escapeHtml(target.label)}</option>`)
          .join("")}</optgroup>`,
      );
    }
    els.recordStudent.innerHTML = parts.join("");
    els.recordStudent.value = selectedTargetValue;
    state.ui.recordTargetValue = selectedTargetValue;
  } else {
    els.recordStudent.innerHTML = `<option value="">请先新增学生</option>`;
    state.ui.recordTargetValue = "";
  }

  const trackerOptions = state.students.length
    ? state.students
        .map(
          (student) =>
            `<option value="${student.id}" ${student.id === state.ui.trackerStudentId ? "selected" : ""}>${escapeHtml(student.name)}${student.className ? ` · ${escapeHtml(student.className)}` : ""}</option>`,
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
  els.recordLessonFocus.value = normalizeLessonFocus(els.recordLessonFocus.value);
  renderRecordFocusPicker();
  renderRecordTargetMeta();
  renderLessonTagPicker();
  renderBuilderPartPicker();
  renderWritingPickers();
  renderDraftPreview("completed", els.completedPreview, draftRecord.completedMaterials);
  renderDraftPreview("assigned", els.assignedPreview, draftRecord.assignedMaterials);
  syncRecordTimeSection();
  renderRecordFocusHint();
  renderRecordSuggestions();
  renderCourseFeedbackPreview();
}

function handleRecordSectionClick(event) {
  const durationButton = event.target.closest("[data-duration-hours]");
  if (durationButton) {
    applyRecordDurationPreset(durationButton.dataset.durationHours);
    return;
  }

  const presetButton = event.target.closest("[data-interaction-preset]");
  if (presetButton) {
    addInteractionPreset(presetButton.dataset.interactionPreset);
    return;
  }

  const toggleButton = event.target.closest("[data-toggle-record-section]");
  if (!toggleButton) {
    return;
  }
  toggleRecordSection(toggleButton.dataset.toggleRecordSection);
}

function applyRecordDurationPreset(hours) {
  const duration = Number(hours);
  if (!Number.isFinite(duration) || duration <= 0) {
    return;
  }
  if (!els.recordStartTime.value) {
    els.recordStartTime.value = "10:00";
  }
  els.recordEndTime.value = defaultEndTimeFromDuration(els.recordStartTime.value, duration);
  syncRecordTimeSection();
  renderCourseFeedbackPreview();
}

function addInteractionPreset(label) {
  const presetText = String(label || "").trim();
  if (!presetText || !els.recordTeacherPrompt) {
    return;
  }
  const current = els.recordTeacherPrompt.value.trim();
  els.recordTeacherPrompt.value = current ? `${current}；${presetText}` : presetText;
  renderCourseFeedbackPreview();
}

function collapseOptionalRecordSections() {
  recordSectionState = getRecordSectionDefaults();
  renderRecordSections();
}

function resetRecordSectionState() {
  recordSectionState = {};
}

function toggleRecordSection(sectionId) {
  recordSectionState[sectionId] = !isRecordSectionOpen(sectionId);
  renderRecordSections();
}

function isRecordSectionOpen(sectionId) {
  const defaults = getRecordSectionDefaults();
  if (Object.prototype.hasOwnProperty.call(recordSectionState, sectionId)) {
    return recordSectionState[sectionId];
  }
  return Boolean(defaults[sectionId]);
}

function getRecordSectionDefaults() {
  const focus = normalizeLessonFocus(els.recordLessonFocus.value);
  const hasLessonTags = draftRecord.lessonTags.length > 0;
  const hasMaterials = draftRecord.completedMaterials.length > 0 || draftRecord.assignedMaterials.length > 0;
  const hasWriting = Boolean(
    draftRecord.writingTask1Types.length || draftRecord.writingTask2Types.length || els.recordWritingNote.value.trim(),
  );
  const hasHomework = Boolean(els.recordHomeworkNote.value.trim() || Number(els.recordHomeworkCompletion.value || 0) > 0);
  const hasNotes = Boolean(els.recordNotes.value.trim());
  const hasInteraction = Boolean(
    els.recordTeacherPrompt.value.trim() || els.recordStudentResponse.value.trim() || els.recordNextGuidance.value.trim(),
  );
  const hasFeedbackSource = Boolean(
    els.recordLessonSummary.value.trim() || hasLessonTags || hasMaterials || hasWriting || hasHomework || hasInteraction || hasNotes,
  );

  return {
    interaction: hasInteraction,
    "lesson-tags": hasLessonTags || ["mock", "review"].includes(focus),
    materials: hasMaterials,
    preview: hasMaterials,
    writing: hasWriting || focus === "writing",
    suggestions: false,
    homework: true,
    feedback: hasFeedbackSource,
    notes: hasNotes,
  };
}

function renderRecordSections() {
  const sections = Array.from(document.querySelectorAll("[data-record-section]"));
  let hiddenCount = 0;
  sections.forEach((section) => {
    const sectionId = section.dataset.recordSection;
    const open = isRecordSectionOpen(sectionId);
    section.classList.toggle("is-collapsed", !open);
    if (!open) {
      hiddenCount += 1;
    }
    const toggleButton = section.querySelector("[data-toggle-record-section]");
    if (toggleButton) {
      toggleButton.textContent = open ? "收起" : "展开";
      toggleButton.setAttribute("aria-expanded", String(open));
    }
  });

  renderRecordCaptureSummary(hiddenCount);
}

function renderRecordCaptureSummary(hiddenCount) {
  if (!els.recordSectionSummary) {
    return;
  }
  const filledItems = getRecordFilledItems();
  const filledText = filledItems.length ? `已填 ${filledItems.join("、")}` : "先记一条核心内容就能生成反馈";
  const hiddenText = hiddenCount > 0 ? `低频项已收起 ${hiddenCount} 项` : "全部内容已展开";
  const feedbackReady = filledItems.length ? "反馈已准备" : "反馈待补充";
  els.recordSectionSummary.textContent = `${filledText} · ${feedbackReady} · ${hiddenText}`;
}

function getRecordFilledItems() {
  const items = [];
  if (els.recordLessonSummary.value.trim()) {
    items.push("核心内容");
  }
  if (draftRecord.completedMaterials.length || draftRecord.lessonTags.length) {
    items.push("课堂内容");
  }
  if (draftRecord.assignedMaterials.length || els.recordHomeworkNote.value.trim() || Number(els.recordHomeworkCompletion.value || 0) > 0) {
    items.push("作业");
  }
  if (els.recordTeacherPrompt.value.trim() || els.recordStudentResponse.value.trim() || els.recordNextGuidance.value.trim()) {
    items.push("互动");
  }
  if (draftRecord.writingTask1Types.length || draftRecord.writingTask2Types.length || els.recordWritingNote.value.trim()) {
    items.push("写作");
  }
  return items;
}

function renderRecordFocusPicker() {
  els.recordLessonFocusPicker.innerHTML = LESSON_FOCUS_OPTIONS.map(
    (item) => `
      <button
        type="button"
        class="filter-chip ${els.recordLessonFocus.value === item.id ? "is-active" : ""}"
        data-lesson-focus="${item.id}"
      >
        ${item.label}
      </button>
    `,
  ).join("");
}

function renderRecordTargetMeta() {
  const target = getTeachingTargetByValue(els.recordStudent.value || state.ui.recordTargetValue);
  if (!target) {
    els.recordTargetMeta.innerHTML = `<span class="tag">先新增学生，再开始录课。</span>`;
    return;
  }

  if (target.type === "class") {
    els.recordTargetMeta.innerHTML = `
      <span class="tag">班级整体录入</span>
      <span class="tag">${target.participantIds.length} 位学员</span>
      <span class="tag">${escapeHtml(target.participantNames.join("、"))}</span>
    `;
    return;
  }

  const student = getStudentById(target.studentId);
  els.recordTargetMeta.innerHTML = `
    <span class="tag">${escapeHtml(student?.exam || "IELTS")} · 目标 ${escapeHtml(student?.target || "待定")}</span>
    <span class="tag">${escapeHtml(student?.courseMode || "雅思1v1")}</span>
    ${student?.className ? `<span class="tag">班级：${escapeHtml(student.className)}</span>` : ""}
  `;
}

function renderRecordFocusHint() {
  const focus = getLessonFocusConfig(els.recordLessonFocus.value);
  els.recordFocusHint.innerHTML = `
    <span class="tag">这节课先写核心内容，其他板块按需补充</span>
    <span class="tag">${escapeHtml(focus.hint)}</span>
  `;
}

function setRecordLessonFocus(value, options = {}) {
  const focus = getLessonFocusConfig(value);
  els.recordLessonFocus.value = focus.id;
  if (options.syncModule && focus.module) {
    els.builderModule.value = focus.module;
  }
  renderRecordFocusPicker();
  renderLessonTagPicker();
  renderBuilderPartPicker();
  renderRecordFocusHint();
  renderRecordSuggestions();
  renderCourseFeedbackPreview();
}

function renderSchedule() {
  const anchorDate = state.ui.scheduleAnchorDate || today();
  const month = anchorDate.slice(0, 7);
  const monthDays = getMonthCalendarDays(anchorDate);
  const monthRecords = getRecordsByMonth(month);
  const monthTrials = getTrialsByMonth(month);
  const classRecords = monthRecords.filter((record) => getRecordCourseMode(record) === "雅思班课");
  const oneOnOneRecords = monthRecords.filter((record) => getRecordCourseMode(record) !== "雅思班课");
  const trialStats = getTrialStats(month);
  const selectedDate = normalizeSelectedScheduleDate(month);
  const selectedRecords = getRecordsByDate(selectedDate);
  const selectedTrials = getTrialsByDate(selectedDate);
  els.scheduleAnchorDate.value = month;
  els.scheduleInsightPanel.innerHTML = [
    {
      label: "班课",
      value: `${classRecords.length} 节`,
      note: `${getClassTargets().length} 个班级 · ${formatHours(sumHours(classRecords))}`,
      tone: "class",
    },
    {
      label: "一对一",
      value: `${oneOnOneRecords.length} 节`,
      note: `已排/已上 ${formatHours(sumHours(oneOnOneRecords))}`,
      tone: "record",
    },
    {
      label: "试听",
      value: `${trialStats.total} 位`,
      note: `${trialStats.scheduled} 已预约 · ${trialStats.followUpCount} 待跟进`,
      tone: "trial",
    },
    {
      label: "转化",
      value: trialStats.conversionRate,
      note: `${trialStats.converted} 已转正 · ${formatHours(trialStats.hours)}`,
      tone: "conversion",
    },
  ]
    .map(
      (item) => `
        <div class="schedule-insight-card is-${item.tone}">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <small>${item.note}</small>
        </div>
      `,
    )
    .join("");
  els.scheduleWeekRange.innerHTML = `
    <span class="tag">${formatMonthTitle(month)}</span>
    <span class="tag">正式 ${monthRecords.length} 节</span>
    <span class="tag">班课 ${classRecords.length} 节</span>
    <span class="tag">试听 ${monthTrials.length} 位</span>
    <span class="tag">已选 ${selectedDate.slice(5)} · 正式 ${selectedRecords.length} / 试听 ${selectedTrials.length}</span>
  `;
  els.scheduleWeekHeader.innerHTML = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    .map((label) => `<span>${label}</span>`)
    .join("");

  els.scheduleBoard.innerHTML = monthDays
    .map((day) => {
      const items = getScheduleEntriesByDate(day.date);
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
                    (item) => `
                      <div class="schedule-course ${item.type === "trial" ? "is-trial" : ""} ${item.type === "class-record" ? "is-class" : ""}">
                        <strong>${item.startTime || "--:--"}-${item.endTime || "--:--"}</strong>
                        <span class="schedule-course-label">
                          ${item.type === "trial" ? `<span class="event-pill is-trial">试听</span>` : ""}
                          ${item.type === "class-record" ? `<span class="event-pill is-class">班课</span>` : ""}
                          <span>${escapeHtml(item.label)}</span>
                        </span>
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

  const dayItems = getAgendaItemsByDate(selectedDate);
  els.scheduleAgenda.innerHTML = dayItems.length
    ? renderDayAgenda(selectedDate, dayItems)
    : `<div class="empty-state">${selectedDate} 暂无课程，点击其他日期查看安排。</div>`;

  bindActionButtons(els.scheduleAgenda, {
    "copy-record-feedback": copyRecordFeedback,
    "edit-record": editRecord,
    "delete-record": deleteRecord,
    "complete-trial": markTrialCompleted,
    "edit-trial": editTrial,
    "delete-trial": deleteTrial,
    "convert-trial": convertTrialToStudent,
  });

  renderClassCohortPanel(month);
  renderTrialPipeline(month);
}

function renderClassCohortPanel(month) {
  const classTargets = getClassTargets();
  if (!classTargets.length) {
    els.classCohortPanel.innerHTML = `<div class="empty-state">还没有班课学生。把学生课程类型设为“雅思班课”并填写班级后，会在这里汇总班课进度。</div>`;
    return;
  }

  els.classCohortPanel.innerHTML = classTargets
    .map((target) => {
      const records = getRecordsByMonth(month).filter((record) => {
        const recordTarget = getRecordTarget(record);
        return recordTarget?.type === "class" && recordTarget.className === target.className;
      });
      const completed = records.filter((record) => record.status === "completed");
      const scheduled = records.filter((record) => record.status === "scheduled");
      const nextRecord = [...scheduled].sort((left, right) => `${left.date}${left.startTime || ""}`.localeCompare(`${right.date}${right.startTime || ""}`))[0];
      return `
        <div class="stack-item class-cohort-card">
          <div class="student-title">
            <h3>${escapeHtml(target.className)}</h3>
            <span class="event-pill is-class">${target.participantIds.length} 人</span>
          </div>
          <div class="class-progress-row">
            <span>本月 ${records.length} 节</span>
            <span>已完成 ${completed.length}</span>
            <span>待上 ${scheduled.length}</span>
          </div>
          <div class="stack-meta">
            ${escapeHtml(target.participantNames.join("、"))}
            <br />
            ${nextRecord ? `下一节：${nextRecord.date} ${nextRecord.startTime || "--:--"}-${nextRecord.endTime || "--:--"} · ${escapeHtml(nextRecord.lessonSummary || "待补课堂重点")}` : "本月暂无待上班课。"}
          </div>
          <div class="stack-actions">
            <button class="ghost-btn" data-action="open-record-target" data-id="${escapeHtml(target.value)}">录班课</button>
          </div>
        </div>
      `;
    })
    .join("");

  bindActionButtons(els.classCohortPanel, {
    "open-record-target": openRecordTarget,
  });
}

function renderTrialPipeline(month) {
  const stats = getTrialStats(month);
  const stages = [
    { label: "预约", value: stats.scheduled },
    { label: "已试听", value: stats.completed },
    { label: "转正", value: stats.converted },
    { label: "待跟进", value: stats.followUpCount },
  ];
  els.trialPipelinePanel.innerHTML = stages
    .map(
      (stage) => `
        <div class="trial-stage">
          <span>${stage.label}</span>
          <strong>${stage.value}</strong>
        </div>
      `,
    )
    .join("");
}

function renderDayAgenda(selectedDate, dayItems) {
  const formalItems = dayItems.filter((item) => item.kind === "record");
  const classCount = formalItems.filter((item) => getRecordCourseMode(item.record) === "雅思班课").length;
  const trialCount = dayItems.filter((item) => item.kind === "trial").length;
  const formalHours = sumHours(formalItems.map((item) => item.record).filter((record) => record.status !== "cancelled"));
  return `
    <div class="day-agenda-summary">
      <div>
        <span>日期</span>
        <strong>${escapeHtml(selectedDate)} ${escapeHtml(formatWeekday(selectedDate, true))}</strong>
      </div>
      <div>
        <span>正式</span>
        <strong>${formalItems.length} 节</strong>
      </div>
      <div>
        <span>班课</span>
        <strong>${classCount} 节</strong>
      </div>
      <div>
        <span>试听</span>
        <strong>${trialCount} 位</strong>
      </div>
      <div>
        <span>课时</span>
        <strong>${formatHours(formalHours)}</strong>
      </div>
    </div>
    <section class="agenda-group agenda-timeline">
      ${dayItems.map(renderAgendaTimelineItem).join("")}
    </section>
  `;
}

function renderAgendaTimelineItem(item) {
  if (item.kind === "trial") {
    return renderTrialAgendaItem(item.trial);
  }
  return renderRecordAgendaItem(item.record);
}

function renderRecordAgendaItem(record) {
  const target = getRecordTarget(record);
  const isClass = target?.type === "class";
  const participantNames = isClass ? target.participantNames.join("、") : "";
  return `
    <div class="stack-item agenda-item ${isClass ? "is-class" : "is-record"}">
      <div class="agenda-time">
        <strong>${record.startTime || "--:--"}</strong>
        <span>${record.endTime || "--:--"}</span>
      </div>
      <div class="agenda-main">
        <div class="trial-card-head">
          <div class="student-title">
            <h3>${escapeHtml(getRecordDisplayName(record))}</h3>
            ${renderCourseBadge(getRecordCourseMode(record))}
            <span class="tag">${formatStatus(record.status)}</span>
          </div>
          <span class="tag">${formatHours(record.duration || 0)}</span>
        </div>
        <div class="stack-meta">
          ${isClass ? `班级整体课 · ${target.participantIds.length} 人${participantNames ? ` · ${escapeHtml(participantNames)}` : ""}` : "正式学生 · 一对一"}
          <br />
          ${escapeHtml(record.lessonSummary || "还没有填写课堂重点，可在编辑里补上。")}
        </div>
        <div class="stack-actions">
          <button class="ghost-btn" data-action="copy-record-feedback" data-id="${record.id}">复制反馈</button>
          <button class="ghost-btn" data-action="edit-record" data-id="${record.id}">编辑</button>
          <button class="ghost-btn" data-action="delete-record" data-id="${record.id}">删除</button>
        </div>
      </div>
    </div>
  `;
}

function renderTrialAgendaItem(trial) {
  const isConverted = trial.status === "converted" || trial.convertedStudentId;
  return `
    <div class="stack-item agenda-item trial-card is-trial">
      <div class="agenda-time">
        <strong>${trial.startTime || "--:--"}</strong>
        <span>${trial.endTime || "--:--"}</span>
      </div>
      <div class="agenda-main">
        <div class="trial-card-head">
          <div class="student-title">
            <h3>${escapeHtml(trial.name)}</h3>
            <span class="event-pill is-trial">试听</span>
            <span class="tag">${formatTrialStatus(trial.status)}</span>
          </div>
          <span class="tag">${formatHours(trial.duration || calculateDurationHours(trial.startTime, trial.endTime))}</span>
        </div>
        <div class="stack-meta">
          试听线索 · ${escapeHtml(trial.source)} · ${escapeHtml(trial.mode)}
          ${trial.followUpDate ? ` · 跟进 ${escapeHtml(trial.followUpDate)}` : ""}
          <br />
          ${escapeHtml(trial.feedback || trial.notes || "试听学生不会进入正式课表；转为在读后才会进入正式学生。")}
        </div>
        <div class="stack-actions">
          ${
            trial.status === "scheduled"
              ? `<button class="ghost-btn" data-action="complete-trial" data-id="${trial.id}">记为已试听</button>`
              : ""
          }
          <button class="ghost-btn" data-action="edit-trial" data-id="${trial.id}">编辑</button>
          ${isConverted ? "" : `<button class="ghost-btn" data-action="convert-trial" data-id="${trial.id}">转为在读</button>`}
          <button class="ghost-btn" data-action="delete-trial" data-id="${trial.id}">删除</button>
        </div>
      </div>
    </div>
  `;
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
  const lessonTags = getFilteredLessonTags();
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
  renderCourseFeedbackPreview();
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
    "copy-record-feedback": copyRecordFeedback,
    "edit-record": editRecord,
    "delete-record": deleteRecord,
  });
}

function renderRecordCard(record) {
  const target = getRecordTarget(record);
  const lessonTagLabels = getLessonTagLabels(record.lessonTags).join(" · ") || "未选课堂模块";
  const completedPreview = compactMaterialText(record.completedMaterials);
  const assignedPreview = compactMaterialText(record.assignedMaterials);
  const writingText = formatWritingText(record.writing);
  const participantNames = target?.type === "class" ? target.participantNames.join("、") : "";

  return `
    <div class="stack-item">
      <div class="student-title">
        <h3>${escapeHtml(getRecordDisplayName(record))} · ${record.date}</h3>
        ${renderCourseBadge(getRecordCourseMode(record))}
      </div>
      <div class="stack-meta">
        ${record.startTime || "--:--"}-${record.endTime || "--:--"} · ${formatStatus(record.status)} · ${formatHours(record.duration || 0)}<br />
        ${participantNames ? `班级成员：${escapeHtml(participantNames)}<br />` : ""}
        ${record.lessonSummary ? `本节课核心内容：${escapeHtml(record.lessonSummary)}<br />` : ""}
        课堂模块：${escapeHtml(lessonTagLabels)}<br />
        本次课堂：${escapeHtml(completedPreview)}<br />
        课后作业：${escapeHtml(assignedPreview)}<br />
        写作情况：${escapeHtml(writingText)}${record.homeworkNote ? `<br />作业备注：${escapeHtml(record.homeworkNote)}` : ""}
      </div>
      <div class="stack-actions">
        <button class="ghost-btn" data-action="copy-record-feedback" data-id="${record.id}">复制反馈</button>
        <button class="ghost-btn" data-action="edit-record" data-id="${record.id}">编辑</button>
        <button class="ghost-btn" data-action="delete-record" data-id="${record.id}">删除</button>
      </div>
    </div>
  `;
}

function renderTrialList() {
  if (!state.trialStudents.length) {
    els.trialList.innerHTML = `<div class="empty-state">还没有试听记录，先录入第一位试听学生。</div>`;
    return;
  }

  els.trialList.innerHTML = `<div class="trial-list-grid">${[...state.trialStudents]
    .sort(compareTrialRecords)
    .map(
      (trial) => renderTrialListCard(trial),
    )
    .join("")}</div>`;

  bindActionButtons(els.trialList, {
    "complete-trial": markTrialCompleted,
    "edit-trial": editTrial,
    "delete-trial": deleteTrial,
    "convert-trial": convertTrialToStudent,
  });
}

function renderTrialListCard(trial) {
  const linkedStudent = trial.convertedStudentId ? getStudentById(trial.convertedStudentId) : null;
  const isConverted = trial.status === "converted" || Boolean(linkedStudent);
  const followUpLabel = isConverted ? "已转入正式学生" : trial.followUpDate || "未设置";
  return `
    <div class="stack-item trial-card ${isConverted ? "is-converted" : ""}">
      <div class="trial-card-head">
        <div class="student-title">
          <h3>${escapeHtml(trial.name)}</h3>
          <span class="event-pill is-trial">试听</span>
          ${isConverted ? `<span class="course-badge is-one-on-one">正式学生：${escapeHtml(linkedStudent?.name || trial.name)}</span>` : ""}
        </div>
        <div class="trial-inline-actions">
          <span class="tag">${formatTrialStatus(trial.status)}</span>
          <span class="tag">${trial.date}</span>
        </div>
      </div>
      <div class="trial-card-meta stack-meta">
        ${trial.startTime || "--:--"}-${trial.endTime || "--:--"} · ${escapeHtml(trial.mode)} · ${escapeHtml(trial.source)}
      </div>
      <div class="trial-detail-grid stack-meta">
        <div><strong>目标：</strong>${escapeHtml(trial.exam)} · ${escapeHtml(trial.foundation)} · ${escapeHtml(trial.target || "待定")}</div>
        <div><strong>联系：</strong>${escapeHtml(trial.contact || "未填")}</div>
        <div><strong>跟进：</strong>${escapeHtml(followUpLabel)}</div>
        <div><strong>分流：</strong>${isConverted ? "已进入正式学生；试听记录仅保留来源和转化痕迹。" : "仍是试听线索，不出现在正式课程录入对象中。"}</div>
        ${trial.feedback ? `<div><strong>试听情况：</strong>${escapeHtml(trial.feedback)}</div>` : ""}
      </div>
      <div class="stack-actions">
        ${
          trial.status === "scheduled"
            ? `<button class="ghost-btn" data-action="complete-trial" data-id="${trial.id}">记为已试听</button>`
            : ""
        }
        <button class="ghost-btn" data-action="edit-trial" data-id="${trial.id}">编辑</button>
        ${isConverted ? "" : `<button class="ghost-btn" data-action="convert-trial" data-id="${trial.id}">转为在读</button>`}
        <button class="ghost-btn" data-action="delete-trial" data-id="${trial.id}">删除</button>
      </div>
    </div>
  `;
}

function renderRecordSuggestions() {
  const target = getTeachingTargetByValue(els.recordStudent.value || state.ui.recordTargetValue);
  const module = els.builderModule.value;

  if (!target) {
    els.recordSuggestionBox.innerHTML = `<span class="tag">先新增学生</span>`;
    return;
  }

  if (target.type === "class") {
    els.recordSuggestionBox.innerHTML = `
      <span class="tag">${escapeHtml(target.className)} 已按班级整体管理</span>
      <span class="tag">班课建议按本周教学进度手动添加题号</span>
    `;
    return;
  }

  const suggestions = suggestNextMaterials(target.studentId, module, 6);
  els.recordSuggestionBox.innerHTML = suggestions.length
    ? suggestions
        .map((code) => `<button type="button" class="chip-btn" data-suggested-material="${code}">${code}</button>`)
        .join("")
    : `<span class="tag">当前模块已经全部分配或完成</span>`;

  els.recordSuggestionBox.querySelectorAll("[data-suggested-material]").forEach((button) => {
    button.addEventListener("click", () => {
      draftRecord.assignedMaterials = uniqueList(draftRecord.assignedMaterials.concat(button.dataset.suggestedMaterial));
      renderDraftPreview("assigned", els.assignedPreview, draftRecord.assignedMaterials);
      renderCourseFeedbackPreview();
    });
  });
}

function renderCourseFeedbackPreview() {
  if (!els.recordFeedbackPreview) {
    return;
  }
  els.recordFeedbackPreview.value = buildDraftRecordFeedback();
  renderRecordSections();
}

function buildDraftRecordFeedback() {
  const target = getTeachingTargetByValue(els.recordStudent.value || state.ui.recordTargetValue);
  if (!target || !els.recordDate.value) {
    return "";
  }

  return buildCourseFeedbackText(
    {
      date: els.recordDate.value,
      lessonFocus: els.recordLessonFocus.value,
      lessonSummary: els.recordLessonSummary.value.trim(),
      lessonTags: [...draftRecord.lessonTags],
      completedMaterials: [...draftRecord.completedMaterials],
      assignedMaterials: [...draftRecord.assignedMaterials],
      writing: {
        task1Types: [...draftRecord.writingTask1Types],
        task2Types: [...draftRecord.writingTask2Types],
        note: els.recordWritingNote.value.trim(),
      },
      interaction: {
        teacherPrompt: els.recordTeacherPrompt.value.trim(),
        studentResponse: els.recordStudentResponse.value.trim(),
        nextGuidance: els.recordNextGuidance.value.trim(),
      },
      homeworkCompletion: Number(els.recordHomeworkCompletion.value || 0),
      homeworkNote: els.recordHomeworkNote.value.trim(),
      notes: els.recordNotes.value.trim(),
    },
    target,
  );
}

function buildCourseFeedbackText(record, target) {
  if (!record?.date || !target) {
    return "";
  }

  const contentParts = [];
  const lessonTagLabels = getLessonTagLabels(record.lessonTags || []);
  const writingText = formatWritingText(record.writing);
  const interactionText = formatInteractionText(record.interaction);

  if (record.lessonSummary) {
    contentParts.push(record.lessonSummary.trim());
  }
  if ((record.completedMaterials || []).length) {
    contentParts.push(`课堂练习：${record.completedMaterials.join("、")}`);
  }
  if (lessonTagLabels.length && !record.lessonSummary) {
    contentParts.push(lessonTagLabels.join("、"));
  }
  if (writingText && writingText !== "无") {
    contentParts.push(`写作训练：${writingText}`);
  }
  if (record.notes) {
    contentParts.push(record.notes.trim());
  }

  const homeworkParts = [];
  if (Number(record.homeworkCompletion || 0) > 0) {
    homeworkParts.push(`上次作业完成度约 ${Number(record.homeworkCompletion)}%`);
  }
  if ((record.assignedMaterials || []).length) {
    homeworkParts.push(record.assignedMaterials.join("、"));
  }
  if (record.homeworkNote) {
    homeworkParts.push(record.homeworkNote.trim());
  }

  const contentText = contentParts.length ? contentParts.join("；") : "完成当次课堂内容讲解与练习。";
  const homeworkText = homeworkParts.length ? homeworkParts.join("；") : "请先复盘课堂笔记，并按课上要求完成巩固练习。";
  const interactionLine = interactionText ? `\n（2）课堂互动：${interactionText}` : "";

  return `【${record.date}】${getCourseFeedbackLabel(target.courseMode)}课程反馈：
（1）课程内容：${contentText}${interactionLine}
（${interactionText ? "3" : "2"}）课后作业：${homeworkText}`;
}

function formatInteractionText(interaction) {
  if (!interaction) {
    return "";
  }
  const parts = [];
  if (interaction.teacherPrompt) {
    parts.push(`老师引导 ${interaction.teacherPrompt}`);
  }
  if (interaction.studentResponse) {
    parts.push(`学生回应 ${interaction.studentResponse}`);
  }
  if (interaction.nextGuidance) {
    parts.push(`下次跟进 ${interaction.nextGuidance}`);
  }
  return parts.join("；");
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
  const normalizedCourseMode = els.studentCourseMode.value || COURSE_MODE_OPTIONS[0];
  const payload = {
    id: els.studentId.value || createId("student"),
    name: els.studentName.value.trim(),
    exam: els.studentExam.value || "IELTS",
    foundation: els.studentFoundation.value || FOUNDATION_OPTIONS[2],
    foundationScore: els.studentFoundationScore.value.trim(),
    target: els.studentTarget.value || EXAM_CONFIG.IELTS[2],
    examDate: els.studentExamDate.value || "",
    courseMode: normalizedCourseMode,
    packageHours: els.studentPackageHours.value || "",
    packagePlan: els.studentPackagePlan.value || normalizeCourseProduct(normalizedCourseMode, ""),
    className: normalizeCourseMode(normalizedCourseMode) === "雅思班课" ? els.studentClassName.value.trim() : "",
    assistant: els.studentAssistant.value || "未匹配",
    notes: els.studentNotes.value.trim(),
  };

  if (!payload.name) {
    window.alert("请先填写学生姓名。");
    return;
  }
  if (normalizeCourseMode(payload.courseMode) === "雅思班课" && !payload.className) {
    window.alert("班课学员请补上所属班级，后面课表才能按班级整体显示。");
    return;
  }

  upsert(state.students, payload);
  state.ui.selectedStudentId = payload.id;
  state.ui.trackerStudentId = payload.id;
  state.ui.recordTargetValue = getDefaultRecordTargetValue(payload.id);
  persist();
  resetStudentForm();
  renderAll();
}

async function handleRecordSubmit(event) {
  event.preventDefault();
  const target = getTeachingTargetByValue(els.recordStudent.value || state.ui.recordTargetValue);
  const completedMaterials = uniqueList(draftRecord.completedMaterials.map((code) => normalizeMaterialCode(code)));
  const assignedMaterials = uniqueList(draftRecord.assignedMaterials.map((code) => normalizeMaterialCode(code)));
  const duration = calculateDurationHours(els.recordStartTime.value, els.recordEndTime.value);
  const writingNote = els.recordWritingNote.value.trim();
  const lessonSummary = els.recordLessonSummary.value.trim();

  const payload = {
    id: els.recordId.value || createId("record"),
    targetType: target?.type || "student",
    studentId: target?.type === "student" ? target.studentId : "",
    className: target?.type === "class" ? target.className : "",
    participantIds: target?.type === "class" ? [...target.participantIds] : target?.studentId ? [target.studentId] : [],
    date: els.recordDate.value,
    startTime: els.recordStartTime.value,
    endTime: els.recordEndTime.value,
    duration,
    status: els.recordStatus.value,
    lessonFocus: normalizeLessonFocus(els.recordLessonFocus.value),
    lessonSummary,
    lessonTags: [...draftRecord.lessonTags],
    primaryModule: els.builderModule.value,
    completedMaterials,
    assignedMaterials,
    writing: {
      task1Types: [...draftRecord.writingTask1Types],
      task2Types: [...draftRecord.writingTask2Types],
      note: writingNote,
    },
    interaction: {
      teacherPrompt: els.recordTeacherPrompt.value.trim(),
      studentResponse: els.recordStudentResponse.value.trim(),
      nextGuidance: els.recordNextGuidance.value.trim(),
    },
    homeworkCompletion: Number(els.recordHomeworkCompletion.value || 0),
    homeworkNote: els.recordHomeworkNote.value.trim(),
    notes: els.recordNotes.value.trim(),
  };

  if (!target || !payload.date) {
    window.alert("请先选择授课对象和日期。");
    return;
  }

  if (!payload.startTime || !payload.endTime || duration <= 0) {
    window.alert("请填写有效的开始时间和结束时间。");
    return;
  }

  const shouldCopyFeedback = event.submitter?.id === "saveAndCopyRecordBtn";
  const feedbackText = shouldCopyFeedback ? buildCourseFeedbackText(payload, target).trim() : "";

  const existing = state.records.find((record) => record.id === payload.id);
  if (existing) {
    removeMaterialLogsByRecord(existing.id);
  }

  upsert(state.records, payload);
  if (payload.status !== "cancelled") {
    payload.completedMaterials.forEach((code) => addMaterialLog(payload, code, "completed"));
    payload.assignedMaterials.forEach((code) => addMaterialLog(payload, code, "assigned"));
  }
  persist();
  resetRecordForm();
  renderAll();
  if (shouldCopyFeedback && feedbackText) {
    await copyTextToClipboard(feedbackText);
    showRecordSaveStatus(`已保存 ${getRecordDisplayName(payload)}，课程反馈已复制。`);
    return;
  }
  showRecordSaveStatus(`已保存 ${getRecordDisplayName(payload)} · ${payload.date} ${payload.startTime}-${payload.endTime}`);
}

function handleTrialSubmit(event) {
  event.preventDefault();
  const duration = calculateDurationHours(els.trialStartTime.value, els.trialEndTime.value);
  const normalizedStatus = normalizeTrialStatus(els.trialStatus.value);
  const fallbackFollowUpDate =
    els.trialFollowUpDate.value ||
    (normalizedStatus === "completed" ? shiftDate(els.trialDate.value || today(), 1) : normalizedStatus === "scheduled" ? els.trialDate.value || today() : "");
  const payload = {
    id: els.trialId.value || createId("trial"),
    name: els.trialName.value.trim(),
    contact: els.trialContact.value.trim(),
    source: els.trialSource.value || TRIAL_SOURCES[0],
    exam: normalizeExam(els.trialExam.value || "IELTS"),
    foundation: normalizeFoundation(els.trialFoundation.value || FOUNDATION_OPTIONS[2]),
    target: els.trialTarget.value.trim(),
    date: els.trialDate.value,
    mode: els.trialMode.value || "线上",
    startTime: els.trialStartTime.value,
    endTime: els.trialEndTime.value,
    duration,
    status: normalizedStatus,
    followUpDate: fallbackFollowUpDate,
    feedback: els.trialFeedback.value.trim(),
    notes: els.trialNotes.value.trim(),
    convertedStudentId: getExistingTrial(els.trialId.value)?.convertedStudentId || "",
    createdAt: getExistingTrial(els.trialId.value)?.createdAt || new Date().toISOString(),
  };

  if (!payload.name || !payload.date) {
    window.alert("请先填写试听学生姓名和试听日期。");
    return;
  }
  if (!payload.startTime || !payload.endTime || duration <= 0) {
    window.alert("请填写有效的试听开始时间和结束时间。");
    return;
  }

  upsert(state.trialStudents, payload);
  persist();
  closeTrialModal();
  resetTrialForm();
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
  els.studentClassName.value = student.className || "";
  els.studentAssistant.value = student.assistant || "未匹配";
  els.studentNotes.value = student.notes || "";
  renderStudentControls();
  switchTab("students");
}

function focusStudent(id) {
  state.ui.selectedStudentId = id;
  state.ui.trackerStudentId = id;
  state.ui.recordTargetValue = getDefaultRecordTargetValue(id);
  persist();
  renderAll();
}

function openStudentRecord(id) {
  state.ui.selectedStudentId = id;
  state.ui.trackerStudentId = id;
  state.ui.recordTargetValue = getDefaultRecordTargetValue(id);
  persist();
  resetRecordForm();
  switchTab("records");
  els.recordStudent.value = state.ui.recordTargetValue;
  renderRecordTargetMeta();
  renderRecordSuggestions();
  els.recordStudent.scrollIntoView({ block: "start", behavior: "smooth" });
}

function openRecordTarget(targetValue) {
  const target = getTeachingTargetByValue(targetValue);
  if (!target) {
    return;
  }
  state.ui.recordTargetValue = target.value;
  if (target.type === "student") {
    state.ui.selectedStudentId = target.studentId;
    state.ui.trackerStudentId = target.studentId;
  }
  persist();
  resetRecordForm();
  switchTab("records");
  els.recordStudent.value = target.value;
  renderRecordTargetMeta();
  renderRecordSuggestions();
  renderCourseFeedbackPreview();
  els.recordStudent.scrollIntoView({ block: "start", behavior: "smooth" });
}

function deleteStudent(id) {
  if (!window.confirm("删除学生后，其课程记录和材料记录也会一起删除。确定继续吗？")) {
    return;
  }
  state.students = state.students.filter((student) => student.id !== id);
  const removedRecordIds = state.records.filter((record) => record.studentId === id).map((record) => record.id);
  state.records = state.records.filter((record) => record.studentId !== id);
  state.records = normalizeRecords(state.records, state.students);
  state.materialLogs = state.materialLogs.filter((log) => !removedRecordIds.includes(log.recordId) && log.studentId !== id);
  if (state.ui.selectedStudentId === id) {
    state.ui.selectedStudentId = state.students[0] ? state.students[0].id : "";
  }
  if (state.ui.trackerStudentId === id) {
    state.ui.trackerStudentId = state.students[0] ? state.students[0].id : "";
  }
  state.ui.recordTargetValue = getDefaultRecordTargetValue(state.ui.selectedStudentId);
  persist();
  renderAll();
}

function editRecord(id) {
  const record = state.records.find((item) => item.id === id);
  if (!record) {
    return;
  }
  resetRecordSectionState();
  els.recordId.value = record.id;
  els.recordStudent.value = getRecordTargetValue(record);
  els.recordDate.value = record.date;
  els.recordStartTime.value = record.startTime || "10:00";
  els.recordEndTime.value = record.endTime || defaultEndTimeFromDuration(record.startTime, record.duration);
  els.recordStatus.value = record.status;
  els.recordLessonFocus.value = normalizeLessonFocus(record.lessonFocus, record.primaryModule, record.writing, record.lessonTags);
  els.recordLessonSummary.value = record.lessonSummary || "";
  els.recordHomeworkCompletion.value = record.homeworkCompletion ?? 0;
  els.recordHomeworkNote.value = record.homeworkNote || "";
  els.recordTeacherPrompt.value = record.interaction?.teacherPrompt || "";
  els.recordStudentResponse.value = record.interaction?.studentResponse || "";
  els.recordNextGuidance.value = record.interaction?.nextGuidance || "";
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
  state.ui.recordTargetValue = els.recordStudent.value;
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

function editTrial(id) {
  const trial = getTrialById(id);
  if (!trial) {
    return;
  }
  els.trialId.value = trial.id;
  els.trialName.value = trial.name || "";
  els.trialContact.value = trial.contact || "";
  els.trialSource.value = trial.source || TRIAL_SOURCES[0];
  els.trialExam.value = normalizeExam(trial.exam);
  els.trialFoundation.value = normalizeFoundation(trial.foundation);
  els.trialTarget.value = trial.target || "";
  els.trialDate.value = trial.date || today();
  els.trialMode.value = trial.mode || "线上";
  els.trialStartTime.value = trial.startTime || "10:00";
  els.trialEndTime.value = trial.endTime || "11:00";
  els.trialStatus.value = normalizeTrialStatus(trial.status);
  els.trialFollowUpDate.value = trial.followUpDate || "";
  els.trialFeedback.value = trial.feedback || "";
  els.trialNotes.value = trial.notes || "";
  openTrialModal();
}

function deleteTrial(id) {
  if (!window.confirm("确定删除这位试听学生的记录吗？")) {
    return;
  }
  state.trialStudents = state.trialStudents.filter((trial) => trial.id !== id);
  persist();
  renderAll();
}

function markTrialCompleted(id) {
  const trial = getTrialById(id);
  if (!trial) {
    return;
  }
  state.trialStudents = state.trialStudents.map((item) =>
    item.id === id
      ? {
          ...item,
          status: "completed",
          followUpDate: item.followUpDate || shiftDate(item.date || today(), 1),
        }
      : item,
  );
  persist();
  renderAll();
}

function convertTrialToStudent(id) {
  const trial = getTrialById(id);
  if (!trial) {
    return;
  }

  const linkedStudent = trial.convertedStudentId ? getStudentById(trial.convertedStudentId) : null;
  if (linkedStudent) {
    state.ui.selectedStudentId = linkedStudent.id;
    state.ui.trackerStudentId = linkedStudent.id;
    state.ui.recordTargetValue = getDefaultRecordTargetValue(linkedStudent.id);
    persist();
    switchTab("students");
    renderAll();
    return;
  }

  const existingStudent = state.students.find((student) => student.name === trial.name);
  const studentId = existingStudent?.id || createId("student");
  const payload = existingStudent || {
    id: studentId,
    name: trial.name,
    exam: normalizeExam(trial.exam),
    foundation: normalizeFoundation(trial.foundation),
    foundationScore: "",
    target: normalizeTarget(trial.exam, trial.target),
    examDate: "",
    courseMode: "雅思1v1",
    packageHours: "",
    packagePlan: normalizeCourseProduct("雅思1v1", ""),
    assistant: "未匹配",
    notes: `试听转正 · 来源 ${trial.source}${trial.feedback ? ` · ${trial.feedback}` : ""}`,
  };

  upsert(state.students, payload);
  state.trialStudents = state.trialStudents.map((item) =>
    item.id === id ? { ...item, status: "converted", convertedStudentId: studentId } : item,
  );
  state.ui.selectedStudentId = studentId;
  state.ui.trackerStudentId = studentId;
  state.ui.recordTargetValue = getDefaultRecordTargetValue(studentId);
  persist();
  renderAll();
  switchTab("students");
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
  els.studentClassName.value = "";
  els.studentAssistant.value = "未匹配";
  renderStudentControls();
}

function resetRecordForm() {
  resetRecordSectionState();
  els.recordForm.reset();
  els.recordId.value = "";
  els.recordDate.value = today();
  els.recordStatus.value = "completed";
  els.recordStudent.value = resolveRecordTargetValue(getTeachingTargets());
  state.ui.recordTargetValue = els.recordStudent.value;
  els.recordLessonFocus.value = "mixed";
  els.recordLessonSummary.value = "";
  els.recordTeacherPrompt.value = "";
  els.recordStudentResponse.value = "";
  els.recordNextGuidance.value = "";
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

function resetTrialForm() {
  els.trialForm.reset();
  els.trialId.value = "";
  els.trialSource.value = TRIAL_SOURCES[0];
  els.trialExam.value = "IELTS";
  els.trialFoundation.value = FOUNDATION_OPTIONS[2];
  els.trialDate.value = state.ui.selectedScheduleDate || today();
  els.trialMode.value = "线上";
  els.trialStartTime.value = "10:00";
  els.trialEndTime.value = "11:00";
  els.trialStatus.value = "scheduled";
  els.trialFollowUpDate.value = "";
  els.trialFeedback.value = "";
  els.trialNotes.value = "";
}

function openTrialModal(options = {}) {
  if (options.forceReset || !els.trialId.value) {
    resetTrialForm();
  }
  document.body.classList.add("modal-open");
  els.trialModal.hidden = false;
  window.requestAnimationFrame(() => {
    els.trialName.focus();
  });
}

function closeTrialModal() {
  document.body.classList.remove("modal-open");
  els.trialModal.hidden = true;
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
  renderCourseFeedbackPreview();
}

function removeDraftMaterial(listName, code) {
  const key = listName === "completed" ? "completedMaterials" : "assignedMaterials";
  draftRecord[key] = draftRecord[key].filter((item) => item !== code);
  renderDraftPreview("completed", els.completedPreview, draftRecord.completedMaterials);
  renderDraftPreview("assigned", els.assignedPreview, draftRecord.assignedMaterials);
  renderCourseFeedbackPreview();
}

function toggleLessonTag(tagId) {
  if (draftRecord.lessonTags.includes(tagId)) {
    draftRecord.lessonTags = draftRecord.lessonTags.filter((item) => item !== tagId);
  } else {
    draftRecord.lessonTags = draftRecord.lessonTags.concat(tagId);
  }
  renderLessonTagPicker();
  renderCourseFeedbackPreview();
}

function toggleWritingType(task, type) {
  const key = task === "task1" ? "writingTask1Types" : "writingTask2Types";
  if (draftRecord[key].includes(type)) {
    draftRecord[key] = draftRecord[key].filter((item) => item !== type);
  } else {
    draftRecord[key] = draftRecord[key].concat(type);
  }
  renderWritingPickers();
  renderCourseFeedbackPreview();
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
  if (state.students.length || state.trialStudents.length || state.records.length) {
    const proceed = window.confirm("载入示例数据会覆盖当前本地数据，确定继续吗？");
    if (!proceed) {
      return;
    }
  }

  const studentA = {
    id: createId("student"),
    name: "学生A",
    exam: "IELTS",
    foundation: "中等",
    foundationScore: "IELTS 5.5",
    target: "7.0",
    examDate: shiftDate(today(), 34),
    courseMode: "雅思1v1",
    packageHours: "30",
    packagePlan: "雅思1v1-30课时",
    assistant: "助教A",
    notes: "匿名示例：6 月考试，容易重复刷旧题。",
  };
  const studentB = {
    id: createId("student"),
    name: "学生B",
    exam: "IELTS",
    foundation: "较稳",
    foundationScore: "IELTS 6.0",
    target: "6.5",
    examDate: shiftDate(today(), 21),
    courseMode: "雅思班课",
    packageHours: "40",
    packagePlan: "雅思强化班-常规开设",
    className: "雅思强化春季班",
    assistant: "助教A",
    notes: "匿名示例：阅读题量大，重点控重复。",
  };
  const studentC = {
    id: createId("student"),
    name: "学生C",
    exam: "IELTS",
    foundation: "中等",
    foundationScore: "IELTS 5.5",
    target: "6.5",
    examDate: shiftDate(today(), 21),
    courseMode: "雅思班课",
    packageHours: "40",
    packagePlan: "雅思强化班-常规开设",
    className: "雅思强化春季班",
    assistant: "助教A",
    notes: "匿名示例：班课口语参与度高，阅读速度偏慢。",
  };

  state.students = [studentA, studentB, studentC];
  state.trialStudents = [
    {
      id: createId("trial"),
      name: "试听A",
      contact: "匿名联系方式",
      source: "转介绍",
      exam: "IELTS",
      foundation: "薄弱",
      target: "6.5",
      date: shiftDate(today(), 2),
      mode: "线上",
      startTime: "19:00",
      endTime: "20:00",
      duration: 1,
      status: "scheduled",
      followUpDate: shiftDate(today(), 3),
      feedback: "家长想先看一节试听后的作业安排。",
      notes: "偏重写作和阅读提分。",
      convertedStudentId: "",
      createdAt: new Date().toISOString(),
    },
  ];
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
      interaction: {
        teacherPrompt: "让学生复述 Part3 选择题定位步骤，并解释两个干扰项的排除依据。",
        studentResponse: "能找到关键词，但同义替换判断还需要老师提示。",
        nextGuidance: "下节课先用 10 分钟复盘定位流程，再进入 Part3 新题训练。",
      },
      homeworkCompletion: 60,
      homeworkNote: "整理错题和生词",
      notes: "Part1 比较稳，Part3 需要继续练定位。",
    },
    {
      id: createId("record"),
      targetType: "class",
      studentId: "",
      className: "雅思强化春季班",
      participantIds: [studentB.id, studentC.id],
      date: shiftDate(today(), 1),
      startTime: "15:00",
      endTime: "16:30",
      duration: 1.5,
      status: "scheduled",
      lessonFocus: "reading",
      lessonSummary: "阅读班课重点讲 Passage 2 的段落匹配和错题复盘，统一梳理定位步骤。",
      lessonTags: ["error-review", "timed-drill", "external-intensive"],
      primaryModule: "reading",
      completedMaterials: ["C14-Test2-Passage2"],
      assignedMaterials: ["C14-Test2-Passage3", "外刊精读-科技社会"],
      writing: {
        task1Types: [],
        task2Types: ["问题解决"],
        note: "下次补一篇Task2提纲。",
      },
      interaction: {
        teacherPrompt: "请班级同学轮流说明段落匹配题的定位顺序。",
        studentResponse: "多数同学能先看题干，但回原文时容易只找原词。",
        nextGuidance: "下次课先做 5 分钟同义替换口头热身。",
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
  state.memo = "1. 跟进 学生A 的 Part3 定位。\n2. 学生B 下节课先做 Passage3。\n3. 周末整理 5 月排课。";
  state.weekNote = "周三确认班课阅读材料；周五前整理作文批改。";
  state.todoNote = "提醒 学生A 补交 Task2\n确认 学生B 下节课是否线上";
  persist();
  resetStudentForm();
  resetRecordForm();
  resetTrialForm();
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

function exportTrialData() {
  if (!state.trialStudents.length) {
    window.alert("还没有试听数据可导出。");
    return;
  }

  const rows = [
    ["学生姓名", "联系方式", "来源渠道", "考试类型", "当前基础", "目标分数", "试听日期", "开始时间", "结束时间", "试听形式", "试听状态", "下次跟进", "试听情况", "备注"],
  ].concat(
    [...state.trialStudents]
      .sort((left, right) => `${right.date}${right.startTime || ""}`.localeCompare(`${left.date}${left.startTime || ""}`))
      .map((trial) => [
        trial.name,
        trial.contact,
        trial.source,
        trial.exam,
        trial.foundation,
        trial.target,
        trial.date,
        trial.startTime,
        trial.endTime,
        trial.mode,
        formatTrialStatus(trial.status),
        trial.followUpDate,
        trial.feedback,
        trial.notes,
      ]),
  );
  const csv = rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `trial-students-${today()}.csv`;
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
      applyImportedState(parsed);
    } catch (error) {
      window.alert("导入失败，请确认文件格式正确。");
    }
  };
  reader.readAsText(file, "utf-8");
  event.target.value = "";
}

function applyImportedState(parsed, options = {}) {
  state.students = normalizeStudents(Array.isArray(parsed.students) ? parsed.students : []);
  state.trialStudents = normalizeTrialStudents(Array.isArray(parsed.trialStudents) ? parsed.trialStudents : []);
  state.records = normalizeRecords(Array.isArray(parsed.records) ? parsed.records : [], state.students);
  state.materialLogs = Array.isArray(parsed.materialLogs) ? parsed.materialLogs : [];
  state.customLessonTags = normalizeLessonTags(parsed.customLessonTags);
  state.ui = {
    selectedMonth: parsed.ui?.selectedMonth || todayMonth(),
    selectedStudentId: parsed.ui?.selectedStudentId || (state.students[0] ? state.students[0].id : ""),
    trackerStudentId: parsed.ui?.trackerStudentId || (state.students[0] ? state.students[0].id : ""),
    recordTargetValue: parsed.ui?.recordTargetValue || "",
    trackerSeries: parsed.ui?.trackerSeries || "all",
    scheduleAnchorDate: parsed.ui?.scheduleAnchorDate || today(),
    selectedScheduleDate: parsed.ui?.selectedScheduleDate || parsed.ui?.scheduleAnchorDate || today(),
    cloudPanelExpanded: typeof parsed.ui?.cloudPanelExpanded === "boolean" ? parsed.ui.cloudPanelExpanded : !hasCloudSession(),
  };
  state.memo = parsed.memo || "";
  state.weekNote = parsed.weekNote || "";
  state.todoNote = parsed.todoNote || "";
  if (!state.materialLogs.length) {
    rebuildMaterialLogs();
  }
  cloudSyncPaused = Boolean(options.skipCloudSync);
  persist();
  cloudSyncPaused = false;
  resetStudentForm();
  resetRecordForm();
  resetTrialForm();
  closeTrialModal();
  renderAll();
}

function saveCloudConfig() {
  cloudState.url = normalizeCloudUrl(els.cloudUrl.value);
  cloudState.anonKey = els.cloudAnonKey.value.trim();
  cloudState.email = els.cloudEmail.value.trim();
  persistCloudState();
  renderCloudPanel();
  setCloudStatus("已保存 Supabase 连接信息。接下来可以注册或登录。");
}

async function handleCloudSignUp() {
  try {
    saveCloudConfig();
    const email = cloudState.email;
    const password = els.cloudPassword.value.trim();
    validateCloudCredentials(email, password);
    setCloudStatus("正在创建老师账号...");
    const data = await supabaseRequest("/auth/v1/signup", {
      method: "POST",
      body: { email, password },
    });
    if (data?.access_token || data?.session?.access_token) {
      storeCloudSession(data);
      els.cloudPassword.value = "";
      state.ui.cloudPanelExpanded = false;
      persist();
      setCloudStatus("注册成功，已自动登录云端。");
      if (isStateEffectivelyEmpty()) {
        await pullStateFromCloud({ notify: false, overwriteLocal: true });
      } else {
        await pushStateToCloud({ notify: false });
      }
    } else {
      setCloudStatus("注册请求已提交。若 Supabase 开启邮件确认，请先完成邮箱验证，再回来登录。");
    }
  } catch (error) {
    setCloudStatus(`注册失败：${formatCloudError(error)}`);
    window.alert(`云端注册失败：${formatCloudError(error)}`);
  }
  renderCloudPanel();
}

async function handleCloudLogin() {
  try {
    saveCloudConfig();
    const email = cloudState.email;
    const password = els.cloudPassword.value.trim();
    validateCloudCredentials(email, password);
    setCloudStatus("正在登录云端...");
    const data = await supabaseRequest("/auth/v1/token?grant_type=password", {
      method: "POST",
      body: { email, password },
    });
    storeCloudSession(data);
    els.cloudPassword.value = "";
    state.ui.cloudPanelExpanded = false;
    persist();
    if (isStateEffectivelyEmpty()) {
      await pullStateFromCloud({ notify: false, overwriteLocal: true });
      setCloudStatus("登录成功，已从云端恢复最近一版数据。");
    } else {
      await pushStateToCloud({ notify: false });
      setCloudStatus("登录成功，本地数据已同步到云端。");
    }
  } catch (error) {
    setCloudStatus(`登录失败：${formatCloudError(error)}`);
    window.alert(`云端登录失败：${formatCloudError(error)}`);
  }
  renderCloudPanel();
}

function handleCloudLogout() {
  cloudState.session = null;
  cloudState.lastSyncedAt = "";
  state.ui.cloudPanelExpanded = true;
  persistCloudState();
  persist();
  renderCloudPanel();
  setCloudStatus("已退出云端登录。网页仍会继续在本地保存数据。");
}

async function hydrateFromCloudIfNeeded() {
  if (!hasCloudSession() || !isStateEffectivelyEmpty()) {
    renderCloudPanel();
    return;
  }
  try {
    await pullStateFromCloud({ notify: false, overwriteLocal: true });
  } catch (error) {
    setCloudStatus(`自动恢复失败：${formatCloudError(error)}`);
  }
  renderCloudPanel();
}

async function pushStateToCloud(options = {}) {
  try {
    await ensureCloudSession();
    setCloudStatus(options.notify ? "正在同步到云端..." : "正在后台同步到云端...");
    const payload = {
      user_id: cloudState.session.user.id,
      snapshot_key: CLOUD_SNAPSHOT_KEY,
      app_data: serializableState(),
      updated_at: new Date().toISOString(),
    };
    await supabaseRequest(`/rest/v1/${CLOUD_TABLE}?on_conflict=user_id,snapshot_key`, {
      method: "POST",
      auth: true,
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: payload,
    });
    cloudState.lastSyncedAt = new Date().toISOString();
    persistCloudState();
    setCloudStatus(`已同步到云端：${formatDateTime(cloudState.lastSyncedAt)}`);
  } catch (error) {
    setCloudStatus(`云端同步失败：${formatCloudError(error)}`);
    if (options.notify) {
      window.alert(`云端同步失败：${formatCloudError(error)}`);
    }
  }
  renderCloudPanel();
}

async function pullStateFromCloud(options = {}) {
  try {
    await ensureCloudSession();
    setCloudStatus(options.notify ? "正在从云端恢复数据..." : "正在检查云端备份...");
    const params = new URLSearchParams({
      select: "app_data,updated_at",
      user_id: `eq.${cloudState.session.user.id}`,
      snapshot_key: `eq.${CLOUD_SNAPSHOT_KEY}`,
      limit: "1",
    });
    const data = await supabaseRequest(`/rest/v1/${CLOUD_TABLE}?${params.toString()}`, {
      method: "GET",
      auth: true,
    });
    const snapshot = Array.isArray(data) ? data[0] : null;
    if (!snapshot?.app_data) {
      setCloudStatus("云端还没有备份数据。先在网页里录入内容，再点“立即同步”。");
      if (options.notify) {
        window.alert("云端还没有备份数据。");
      }
      renderCloudPanel();
      return;
    }
    applyImportedState(snapshot.app_data, { skipCloudSync: true });
    cloudState.lastSyncedAt = snapshot.updated_at || new Date().toISOString();
    persistCloudState();
    setCloudStatus(`已从云端恢复：${formatDateTime(cloudState.lastSyncedAt)}`);
    if (options.notify) {
      window.alert("已从云端恢复最近一版数据。");
    }
  } catch (error) {
    setCloudStatus(`云端恢复失败：${formatCloudError(error)}`);
    if (options.notify) {
      window.alert(`云端恢复失败：${formatCloudError(error)}`);
    }
  }
  renderCloudPanel();
}

function scheduleCloudPush() {
  if (cloudSyncPaused || !hasCloudSession()) {
    return;
  }
  window.clearTimeout(cloudPushTimer);
  cloudPushTimer = window.setTimeout(() => {
    void pushStateToCloud({ notify: false });
  }, 1200);
}

async function ensureCloudSession() {
  validateCloudConfig();
  if (!hasCloudSession()) {
    throw new Error("请先登录云端。");
  }
  const expiresAt = Number(cloudState.session.expires_at || 0);
  if (!expiresAt || expiresAt - 60 > Math.floor(Date.now() / 1000)) {
    return;
  }
  if (!cloudState.session.refresh_token) {
    throw new Error("云端登录已过期，请重新登录。");
  }
  const refreshed = await supabaseRequest("/auth/v1/token?grant_type=refresh_token", {
    method: "POST",
    body: { refresh_token: cloudState.session.refresh_token },
  });
  storeCloudSession(refreshed);
}

async function supabaseRequest(path, options = {}) {
  validateCloudConfig();
  const request = {
    method: options.method || "GET",
    headers: {
      apikey: cloudState.anonKey,
      ...(options.auth ? { Authorization: `Bearer ${cloudState.session.access_token}` } : {}),
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };
  const response = await fetch(`${cloudState.url}${path}`, request);
  const text = await response.text();
  const data = safelyParse(text) ?? (text ? { message: text } : null);
  if (!response.ok) {
    throw new Error(data?.msg || data?.error_description || data?.message || `HTTP ${response.status}`);
  }
  return data;
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
        assistant: getRowValue(row, headerMap, ["匹配助教", "助教"]) || "未匹配",
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
    const target = getRecordTarget(record);
    const key = getRecordTargetKey(record);
    if (!target || !key) {
      return;
    }
    const existing = hours.get(key) || {
      name: target.label,
      courseMode: target.courseMode,
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
    hours.set(key, existing);
  });
  return Array.from(hours.values()).sort((left, right) => right.plannedHours - left.plannedHours);
}

function buildFollowUps() {
  const output = [];

  state.records
    .filter((record) => record.homeworkNote && Number(record.homeworkCompletion) < 100)
    .slice(0, 4)
    .forEach((record) => {
      output.push({
        title: `${getRecordDisplayName(record)} 的作业仍在进行中`,
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

  state.trialStudents
    .filter((trial) => !["cancelled", "converted", "paused"].includes(trial.status))
    .slice(0, 4)
    .forEach((trial) => {
      output.push({
        title: `${trial.name} 试听待跟进`,
        detail: `${trial.date} ${trial.startTime || "--:--"} · ${formatTrialStatus(trial.status)}${trial.followUpDate ? ` · 下次跟进 ${trial.followUpDate}` : ""}`,
      });
    });

  return output;
}

function addMaterialLog(record, code, status) {
  const participantIds = getNormalizedParticipantIds(record.participantIds, state.students, record.className, record.studentId);
  const targetIds = participantIds.length ? participantIds : [record.studentId].filter(Boolean);
  targetIds.forEach((studentId) => {
    state.materialLogs.push({
      id: createId("material"),
      studentId,
      recordId: record.id,
      module: detectMaterialModule(code) || record.primaryModule || "listening",
      code,
      status,
      date: record.date,
    });
  });
}

function rebuildMaterialLogs() {
  state.records = normalizeRecords(state.records, state.students);
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

function normalizeRecords(records, students = state.students) {
  return records.map((record) => {
    const primaryModule = record.primaryModule || record.module || detectMaterialModule(record.completedMaterials?.[0] || record.assignedMaterials?.[0]) || "listening";
    const writing = normalizeWriting(record.writing);
    return {
      ...record,
      targetType: record.targetType === "class" || record.className ? "class" : "student",
      studentId: String(record.studentId || "").trim(),
      className: String(record.className || "").trim(),
      participantIds: getNormalizedParticipantIds(record.participantIds, students, record.className, record.studentId),
      date: record.date || today(),
      startTime: normalizeTime(record.startTime || record.start || ""),
      endTime: normalizeTime(record.endTime || record.end || defaultEndTimeFromDuration(record.startTime || record.start, record.duration)),
      duration: normalizeDuration(record.duration, record.startTime || record.start, record.endTime || record.end),
      status: ["scheduled", "completed", "cancelled"].includes(record.status) ? record.status : "scheduled",
      lessonFocus: normalizeLessonFocus(record.lessonFocus, primaryModule, writing, record.lessonTags),
      lessonSummary: String(record.lessonSummary || "").trim(),
      lessonTags: Array.isArray(record.lessonTags) ? record.lessonTags : [],
      primaryModule,
      completedMaterials: uniqueList((record.completedMaterials || []).map((code) => normalizeMaterialCode(code))),
      assignedMaterials: uniqueList((record.assignedMaterials || []).map((code) => normalizeMaterialCode(code))),
      writing,
      interaction: normalizeInteraction(record.interaction),
      homeworkCompletion: Number(record.homeworkCompletion || 0),
      homeworkNote: record.homeworkNote || record.homework || "",
      notes: record.notes || "",
    };
  });
}

function normalizeInteraction(interaction) {
  return {
    teacherPrompt: String(interaction?.teacherPrompt || "").trim(),
    studentResponse: String(interaction?.studentResponse || "").trim(),
    nextGuidance: String(interaction?.nextGuidance || "").trim(),
  };
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
    className: String(student.className || "").trim(),
    assistant: student.assistant || "未匹配",
    notes: student.notes || "",
  }));
}

function normalizeTrialStudents(trials) {
  return (Array.isArray(trials) ? trials : []).map((trial) => ({
    id: trial.id || createId("trial"),
    name: String(trial.name || "").trim(),
    contact: String(trial.contact || "").trim(),
    source: TRIAL_SOURCES.includes(trial.source) ? trial.source : TRIAL_SOURCES[0],
    exam: normalizeExam(trial.exam),
    foundation: normalizeFoundation(trial.foundation),
    target: String(trial.target || "").trim(),
    date: trial.date || today(),
    mode: trial.mode === "线下" ? "线下" : "线上",
    startTime: normalizeTime(trial.startTime || trial.start || ""),
    endTime: normalizeTime(trial.endTime || trial.end || defaultEndTimeFromDuration(trial.startTime || trial.start, trial.duration || 1)),
    duration: normalizeDuration(trial.duration, trial.startTime || trial.start, trial.endTime || trial.end),
    status: normalizeTrialStatus(trial.status),
    followUpDate: trial.followUpDate || "",
    feedback: String(trial.feedback || "").trim(),
    notes: String(trial.notes || "").trim(),
    convertedStudentId: String(trial.convertedStudentId || ""),
    createdAt: trial.createdAt || new Date().toISOString(),
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

function getCourseFeedbackLabel(courseMode) {
  return normalizeCourseMode(courseMode) === "雅思班课" ? "雅思班课" : "雅思一对一";
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

function normalizeTrialStatus(value) {
  return Object.prototype.hasOwnProperty.call(TRIAL_STATUS_LABELS, value) ? value : "scheduled";
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

function getWeekTrials(anchorDate) {
  const weekDays = new Set(getWeekDays(anchorDate || today()));
  return [...state.trialStudents]
    .filter((trial) => weekDays.has(trial.date))
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

function getTrialById(id) {
  return state.trialStudents.find((trial) => trial.id === id);
}

function getExistingTrial(id) {
  return id ? getTrialById(id) : null;
}

function getTrialsByMonth(month) {
  return state.trialStudents.filter((trial) => trial.date.startsWith(month));
}

function getTrialsByDate(date) {
  return [...state.trialStudents]
    .filter((trial) => trial.date === date)
    .sort((left, right) => (left.startTime || "").localeCompare(right.startTime || ""));
}

function getAgendaItemsByDate(date) {
  return getRecordsByDate(date)
    .map((record) => ({
      kind: "record",
      record,
      startTime: record.startTime,
      endTime: record.endTime,
    }))
    .concat(
      getTrialsByDate(date).map((trial) => ({
        kind: "trial",
        trial,
        startTime: trial.startTime,
        endTime: trial.endTime,
      })),
    )
    .sort((left, right) => {
      const timeCompare = (left.startTime || "").localeCompare(right.startTime || "");
      if (timeCompare !== 0) {
        return timeCompare;
      }
      const order = { record: 0, trial: 1 };
      return (order[left.kind] ?? 9) - (order[right.kind] ?? 9);
    });
}

function getScheduleEntriesByDate(date) {
  return getRecordsByDate(date)
    .map((record) => ({
      type: getRecordCourseMode(record) === "雅思班课" ? "class-record" : "record",
      id: record.id,
      startTime: record.startTime,
      endTime: record.endTime,
      label: getRecordDisplayName(record),
      status: record.status,
      duration: record.duration,
    }))
    .concat(
      getTrialsByDate(date).map((trial) => ({
        type: "trial",
        id: trial.id,
        startTime: trial.startTime,
        endTime: trial.endTime,
        label: trial.name,
        status: trial.status,
        duration: trial.duration,
      })),
    )
    .sort((left, right) => (left.startTime || "").localeCompare(right.startTime || ""));
}

function getTrialStats(month) {
  const trials = getTrialsByMonth(month);
  const completedBase = trials.filter((trial) => ["completed", "converted"].includes(trial.status));
  const converted = trials.filter((trial) => trial.status === "converted" || trial.convertedStudentId).length;
  const followUpCount = trials.filter((trial) => !["cancelled", "converted", "paused"].includes(trial.status)).length;
  return {
    total: trials.length,
    scheduled: trials.filter((trial) => trial.status === "scheduled").length,
    completed: completedBase.length,
    noShow: trials.filter((trial) => trial.status === "no-show").length,
    cancelled: trials.filter((trial) => trial.status === "cancelled").length,
    converted,
    followUpCount,
    hours: sumHours(trials.filter((trial) => trial.status !== "cancelled")),
    conversionRate: completedBase.length ? `${Math.round((converted / completedBase.length) * 100)}%` : "0%",
  };
}

function compareTrialRecords(left, right) {
  const priority = {
    scheduled: 0,
    completed: 1,
    "no-show": 2,
    paused: 3,
    converted: 4,
    cancelled: 5,
  };
  const priorityDiff = (priority[left.status] ?? 9) - (priority[right.status] ?? 9);
  if (priorityDiff !== 0) {
    return priorityDiff;
  }
  return `${right.date}${right.startTime || ""}`.localeCompare(`${left.date}${left.startTime || ""}`);
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

function toggleCloudPanel() {
  state.ui.cloudPanelExpanded = !state.ui.cloudPanelExpanded;
  persist();
  renderCloudPanel();
}

async function copyCurrentRecordFeedback() {
  const text = els.recordFeedbackPreview.value.trim();
  if (!text) {
    window.alert("先录入课堂内容和课后作业，再复制课程反馈。");
    return;
  }
  await copyTextToClipboard(text, "课程反馈已复制。");
}

async function copyRecordFeedback(id) {
  const record = state.records.find((item) => item.id === id);
  const target = getRecordTarget(record);
  const text = record && target ? buildCourseFeedbackText(record, target).trim() : "";
  if (!text) {
    window.alert("这条记录还不能生成课程反馈。");
    return;
  }
  await copyTextToClipboard(text, "课程反馈已复制。");
}

function showRecordSaveStatus(message) {
  if (!els.recordSaveStatus) {
    return;
  }
  window.clearTimeout(recordSaveStatusTimer);
  els.recordSaveStatus.textContent = message;
  els.recordSaveStatus.classList.add("is-visible");
  recordSaveStatusTimer = window.setTimeout(() => {
    els.recordSaveStatus.classList.remove("is-visible");
    els.recordSaveStatus.textContent = "";
  }, 4200);
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

function formatTrialStatus(status) {
  return TRIAL_STATUS_LABELS[normalizeTrialStatus(status)] || status;
}

function loadState() {
  const saved = safelyParse(window.localStorage.getItem(STORAGE_KEY));
  const legacy = LEGACY_STORAGE_KEYS.map((key) => safelyParse(window.localStorage.getItem(key))).find(Boolean);
  const source = saved || legacy || {};
  const students = normalizeStudents(Array.isArray(source.students) ? source.students : []);

  return {
    students,
    trialStudents: normalizeTrialStudents(Array.isArray(source.trialStudents) ? source.trialStudents : []),
    records: normalizeRecords(Array.isArray(source.records) ? source.records : [], students),
    materialLogs: Array.isArray(source.materialLogs) ? source.materialLogs : [],
    customLessonTags: normalizeLessonTags(source.customLessonTags),
    memo: source.memo || "",
    weekNote: source.weekNote || "",
    todoNote: source.todoNote || "",
    ui: {
      selectedMonth: source.ui?.selectedMonth || todayMonth(),
      selectedStudentId: source.ui?.selectedStudentId || "",
      trackerStudentId: source.ui?.trackerStudentId || "",
      recordTargetValue: source.ui?.recordTargetValue || "",
      trackerSeries: source.ui?.trackerSeries || "all",
      scheduleAnchorDate: source.ui?.scheduleAnchorDate || today(),
      selectedScheduleDate: source.ui?.selectedScheduleDate || source.ui?.scheduleAnchorDate || today(),
      cloudPanelExpanded: typeof source.ui?.cloudPanelExpanded === "boolean" ? source.ui.cloudPanelExpanded : true,
    },
  };
}

function loadCloudState() {
  const source = safelyParse(window.localStorage.getItem(CLOUD_STORAGE_KEY)) || {};
  return {
    url: normalizeCloudUrl(source.url) || DEFAULT_SUPABASE_URL,
    anonKey: String(source.anonKey || DEFAULT_SUPABASE_ANON_KEY),
    email: String(source.email || ""),
    session: normalizeCloudSession(source.session),
    lastSyncedAt: String(source.lastSyncedAt || ""),
    statusText: String(source.statusText || ""),
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
  scheduleCloudPush();
}

function persistCloudState() {
  window.localStorage.setItem(
    CLOUD_STORAGE_KEY,
    JSON.stringify({
      url: cloudState.url,
      anonKey: cloudState.anonKey,
      email: cloudState.email,
      session: cloudState.session,
      lastSyncedAt: cloudState.lastSyncedAt,
      statusText: cloudState.statusText || "",
    }),
  );
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

function normalizeCloudUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function normalizeCloudSession(source) {
  if (!source || !(source.access_token || source.accessToken)) {
    return null;
  }
  const expiresIn = Number(source.expires_in || source.expiresIn || 0);
  return {
    access_token: source.access_token || source.accessToken,
    refresh_token: source.refresh_token || source.refreshToken || "",
    expires_at: Number(source.expires_at || source.expiresAt || 0) || (expiresIn ? Math.floor(Date.now() / 1000) + expiresIn : 0),
    user: {
      id: source.user?.id || "",
      email: source.user?.email || "",
    },
  };
}

function storeCloudSession(payload) {
  cloudState.session = normalizeCloudSession(payload.session || payload);
  if (!cloudState.session) {
    throw new Error("Supabase 没有返回有效 session。");
  }
  cloudState.email = cloudState.session.user.email || cloudState.email;
  persistCloudState();
}

function hasCloudSession() {
  return Boolean(cloudState.session?.access_token && cloudState.session?.user?.id);
}

function validateCloudConfig() {
  if (!cloudState.url || !/^https:\/\/.+\.supabase\.co$/i.test(cloudState.url)) {
    throw new Error("请先填写正确的 Supabase URL。");
  }
  if (!cloudState.anonKey) {
    throw new Error("请先填写 Supabase anon key。");
  }
}

function validateCloudCredentials(email, password) {
  validateCloudConfig();
  if (!email) {
    throw new Error("请先填写老师邮箱。");
  }
  if (!password || password.length < 6) {
    throw new Error("请填写至少 6 位的登录密码。");
  }
}

function getCloudBadgeLabel() {
  if (hasCloudSession()) {
    return "云端已连接";
  }
  return cloudState.url && cloudState.anonKey ? "待登录" : "仅本地";
}

function getCloudStatusText() {
  if (cloudState.statusText) {
    return cloudState.statusText;
  }
  if (cloudState.lastSyncedAt) {
    return `最近云端同步：${formatDateTime(cloudState.lastSyncedAt)}`;
  }
  return "目前仍是本地存储。配置 Supabase 后可以开启云端同步。";
}

function getCloudSummaryText() {
  if (hasCloudSession()) {
    const synced = cloudState.lastSyncedAt ? `最近同步 ${formatDateTime(cloudState.lastSyncedAt)}` : "云端已连接";
    return `${cloudState.email || "老师账号"} · ${synced}`;
  }
  return "本地优先保存，只有需要时再展开云端配置。";
}

function setCloudStatus(message) {
  cloudState.statusText = message;
  persistCloudState();
  if (els.cloudStatusText) {
    els.cloudStatusText.textContent = message;
  }
}

function serializableState() {
  return JSON.parse(JSON.stringify(state));
}

function isStateEffectivelyEmpty() {
  return (
    !state.students.length &&
    !state.trialStudents.length &&
    !state.records.length &&
    !state.materialLogs.length &&
    !state.memo &&
    !state.weekNote &&
    !state.todoNote
  );
}

function formatCloudError(error) {
  return error instanceof Error ? error.message : String(error || "未知错误");
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function escapeCsvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

async function copyTextToClipboard(text, successMessage) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const temp = document.createElement("textarea");
      temp.value = text;
      temp.setAttribute("readonly", "readonly");
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
    }
    if (successMessage) {
      window.alert(successMessage);
    }
  } catch (error) {
    window.alert("复制失败，请稍后重试。");
  }
}
