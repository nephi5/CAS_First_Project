!function(){var n=Handlebars.template,t=Handlebars.templates=Handlebars.templates||{};t["filter-panel"]=n({compiler:[7,">= 4.0.0"],main:function(n,t,i,e,l){return'<div class="first-button-group">\n    <button\n            class="btn"\n            filter-option="finishDate"\n            onclick="window.FPCtrl.setFilterBy(\'finishDate\')">\n        By due Date\n    </button>\n    <button\n            class="btn"\n            filter-option="createdDate"\n            onclick="window.FPCtrl.setFilterBy(\'createdDate\')">\n        By created Date\n    </button>\n    <button\n            class="btn"\n            filter-option="importance"\n            onclick="window.FPCtrl.setFilterBy(\'importance\')">\n        By Importance\n    </button>\n</div>\n<div class="finished-filter">\n    <button class="btn" onclick="window.FPCtrl.toggleFinished()">\n        Show Finished\n    </button>\n</div>\n'},useData:!0}),t["reminder-detail"]=n({compiler:[7,">= 4.0.0"],main:function(n,t,i,e,l){return'<div class="reminder-detail">\n    <div class="row">\n        <div class="first-column">\n            Title\n        </div>\n        <div class="second-column">\n            <input type="text" class="input-title">\n        </div>\n    </div>\n    <div class="row">\n        <div class="first-column">\n            Note\n        </div>\n        <div class="second-column">\n            <textarea class="input-note" rows="10"></textarea>\n        </div>\n    </div>\n    <div class="row">\n        <div class="first-column">\n            Importance\n        </div>\n        <div class="second-column priority-symbol-container">\n\n        </div>\n    </div>\n\n    <div class="row">\n        <div class="first-column">\n            Due Date\n        </div>\n        <div class="second-column">\n            <input type="date" class="input-date">\n        </div>\n    </div>\n    <div class="row">\n        <div class="second-column buttons">\n            <button class="btn btn-primary" onclick="window.RDCtrl.saveChanges()">Save</button>\n            <button class="btn" onclick="window.RDCtrl.cancelChanges()">Cancel</button>\n        </div>\n    </div>\n</div>'},useData:!0}),t["reminder-list"]=n({1:function(n,t,i,e,l){var a,s,o=null!=t?t:n.nullContext||{},r=i.helperMissing,c=n.escapeExpression;return'        <div class="container">\n            <div class="first-column">\n'+(null!=(a=i.if.call(o,null!=t?t.dueDate:t,{name:"if",hash:{},fn:n.program(2,l,0),inverse:n.program(4,l,0),data:l}))?a:"")+'            </div>\n            <div class="second-column">\n                <div class="title-symbol-container">\n                    <div class="title">\n                        '+c((s=null!=(s=i.title||(null!=t?t.title:t))?s:r,"function"==typeof s?s.call(o,{name:"title",hash:{},data:l}):s))+'\n                    </div>\n                    <div class="priority-symbol-container">\n                        '+(null!=(a=(i.displayPriority||t&&t.displayPriority||r).call(o,null!=t?t.priority:t,{name:"displayPriority",hash:{},fn:n.program(6,l,0),inverse:n.noop,data:l}))?a:"")+'\n                    </div>\n                </div>\n            </div>\n            <div class="third-column">\n                <button reminder-id="'+c((s=null!=(s=i.id||(null!=t?t.id:t))?s:r,"function"==typeof s?s.call(o,{name:"id",hash:{},data:l}):s))+'" class="btn btn-edit">Edit</button>\n            </div>\n\n            <div class="first-column second-row">\n                <input\n                        reminder-id="'+c((s=null!=(s=i.id||(null!=t?t.id:t))?s:r,"function"==typeof s?s.call(o,{name:"id",hash:{},data:l}):s))+'"\n                        type="checkbox"\n                        '+(null!=(a=i.if.call(o,null!=t?t.finished:t,{name:"if",hash:{},fn:n.program(8,l,0),inverse:n.noop,data:l}))?a:"")+"\n                >\n                "+(null!=(a=i.if.call(o,null!=t?t.finished:t,{name:"if",hash:{},fn:n.program(10,l,0),inverse:n.noop,data:l}))?a:"")+'\n            </div>\n            <div class="second-column notes second-row">\n                '+c((s=null!=(s=i.notes||(null!=t?t.notes:t))?s:r,"function"==typeof s?s.call(o,{name:"notes",hash:{},data:l}):s))+"\n            </div>\n\n        </div>\n"},2:function(n,t,i,e,l){return"                    "+n.escapeExpression((i.formatDate||t&&t.formatDate||i.helperMissing).call(null!=t?t:n.nullContext||{},null!=t?t.dueDate:t,{name:"formatDate",hash:{},data:l}))+"\n"},4:function(n,t,i,e,l){return"                    Someday\n"},6:function(n,t,i,e,l){return""},8:function(n,t,i,e,l){return"checked"},10:function(n,t,i,e,l){return" <span>["+n.escapeExpression((i.formatDate||t&&t.formatDate||i.helperMissing).call(null!=t?t:n.nullContext||{},null!=t?t.finishDate:t,{name:"formatDate",hash:{},data:l}))+"]</span> "},compiler:[7,">= 4.0.0"],main:function(n,t,i,e,l){var a;return'<div class="list-container">\n'+(null!=(a=i.each.call(null!=t?t:n.nullContext||{},null!=t?t.reminders:t,{name:"each",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?a:"")+"</div>\n"},useData:!0}),t["reminder-overview-view"]=n({compiler:[7,">= 4.0.0"],main:function(n,t,i,e,l){return'<div class="top-buttons">\n    <button onclick="window.MCtrl.renderReminderDetailView()" class="btn btn-primary">Create New Note</button>\n    <select>\n        <option value="normal">Normal</option>\n        <option value="blackWhiteStyle">BlackWhite-Style</option>\n    </select>\n</div>\n<div class="filter-panel">\n\n</div>\n<div class="reminder-list">\n\n</div>'},useData:!0})}();