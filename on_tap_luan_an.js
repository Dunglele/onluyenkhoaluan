/* Offline study companion. No network requests, dependencies, or application writes. */
(function () {
'use strict';
const SOURCES = {
 hybrid:'AIAttendanceWeb3/docs/HYBRID_15_IMPLEMENTATION.md',
 verify:'AIAttendanceWeb3/docs/HYBRID15_VERIFICATION.md',
 nlu:'AIAttendanceWeb3/ai-service/app/routers/nlu.py',
 jev:'AIAttendanceWeb3/ai-service/app/services/jev.py',
 fusion:'AIAttendanceWeb3/ai-service/app/services/hybrid_policy.py',
 face:'Face-Detect-MERN-Stack/face_detect/face_service.py',
 config:'Face-Detect-MERN-Stack/face_detect/config.py',
 kiosk:'Face-Detect-MERN-Stack/mern/frontend/src/pages/KioskPage.jsx',
 enroll:'AIAttendanceWeb3/frontend/src/FaceEnrollPage.jsx',
 userRoutes:'AIAttendanceWeb3/backend/src/routes/user.routes.js',
 attendance:'Face-Detect-MERN-Stack/mern/backend/controllers/attendanceController.js',
 employee:'Face-Detect-MERN-Stack/mern/backend/routes/employeeRoutes.js',
 db:'Face-Detect-MERN-Stack/mern/backend/config/db.js',
 centralDb:'AIAttendanceWeb3/backend/src/config/db.js',
 contract:'AIAttendanceWeb3/contracts/contracts/AttendanceAnchor.sol',
 anchor:'AIAttendanceWeb3/backend/src/services/anchorWorker.js',
 crossTests:'Face-Detect-MERN-Stack/mern/backend/tests/microserviceContractAndWeb3.test.js'
};
const TOPICS = {
 scope:'Bài toán & phạm vi', face:'AI khuôn mặt', nlu:'NLU & JEV', security:'Backend & bảo mật',
 data:'Dữ liệu & dịch vụ', web3:'MERN & blockchain', testing:'Kiểm thử & bảo vệ'
};
const LEVELS={1:'Nền tảng',2:'Vận dụng',3:'Phản biện'};
const questions=[];
// The correct choice is moved to a stable varying position, with the key remapped.
function mcq(id,topic,level,prompt,choices,answer,why,followup,sourceKeys){
 const offset=(questions.length*3+1)%4;
 const options=choices.slice(offset).concat(choices.slice(0,offset));
 questions.push({id,topic,level,type:'mcq',prompt,options,correct:(4-offset)%4,answer,why,followup,sources:sourceKeys.map(k=>SOURCES[k])});
}
function oral(id,topic,level,prompt,answer,why,followup,sourceKeys){
 questions.push({id,topic,level,type:'oral',prompt,answer,why,followup,sources:sourceKeys.map(k=>SOURCES[k])});
}
mcq('S01','scope',1,'Ba nhóm chức năng chính giải quyết những phần nào của bài toán chấm công?',[
 'Khuôn mặt hỗ trợ xác thực; chatbot tra cứu nghiệp vụ; hash neo giúp đối chiếu tính toàn vẹn.',
 'Khuôn mặt xác định ca làm; chatbot quyết định quyền; blockchain lưu mọi ảnh camera.',
 'Khuôn mặt tạo đơn nghỉ; chatbot xác minh người thật; blockchain tính trạng thái đi trễ.',
 'Khuôn mặt bảo đảm mọi bản ghi đúng; chatbot thay toàn bộ backend; blockchain thay MongoDB.'
],'Ba nhóm bổ sung cho nhau: xác thực khuôn mặt, tương tác nghiệp vụ và kiểm tra dữ liệu đã neo.','Một công nghệ chỉ cung cấp một loại bằng chứng. Phân công rõ giúp tránh dùng điểm AI làm quyền truy cập hoặc coi hash là bằng chứng hiện diện.','Nếu bỏ blockchain, chức năng chấm công còn chạy được không? Phần bảo đảm nào giảm đi?',['face','hybrid','contract']);
mcq('S02','scope',1,'Tại sao phải phân biệt 15 nhãn mô hình với catalogue hướng dẫn có 49 mục?',[
 'Catalogue điều hướng và không gian nhãn mô hình có vai trò khác nhau; bản triển khai giữ 15 nhãn.',
 '49 mục chứng minh mô hình đã học đủ 49 lớp dù checkpoint vẫn dùng 15 nhãn.',
 'Có thể tự đổi tên 15 nhãn theo menu vì backend luôn suy ra được nhãn mới.',
 '15 nhãn chỉ dành cho nhân viên; quản lý tự động dùng một mô hình 49 lớp khác.'
],'Mô hình triển khai có đúng 15 nhãn; catalogue guided độc lập vẫn có 49 mục.','Bộ ánh xạ nhãn là hợp đồng giữa mô hình và handler. Mở rộng menu không tự huấn luyện hay thay đổi đầu ra của checkpoint.','Muốn thêm nghiệp vụ mới thì phải thay những gì ngoài một mục menu?',['hybrid','jev']);
mcq('S03','scope',2,'Người dùng viết “xin nghỉ phép”, hệ thống nên hiểu đến mức nào trước khi ghi đơn?',[
 'Xác định ý định rồi mở luồng nhập, xem lại và xác nhận đơn đã được kiểm tra.',
 'Ghi ngay đơn vì việc nhận đúng ý định đã thể hiện toàn bộ sự đồng ý cần thiết.',
 'Yêu cầu JEV tự viết bản ghi MongoDB để tránh lặp lại bước xác nhận ở backend.',
 'Đổi thành truy vấn trạng thái nghỉ phép vì chatbot chỉ được đọc mọi nghiệp vụ.'
],'Nhận ra leave_request mở luồng hướng dẫn; ghi đơn chỉ diễn ra qua bước xác nhận hợp lệ.','Phân loại ý định chưa xác định đủ ngày nghỉ, chủ thể và sự xác nhận. Backend giữ validation, ràng buộc người dùng và kiểm soát ghi lặp.','Tại sao “tạo đơn” và “xem trạng thái đơn” cần hai nhãn khác nhau?',['hybrid']);
mcq('S04','scope',2,'Khi mô tả đóng góp của đề tài, cách diễn đạt nào có bằng chứng phù hợp nhất?',[
 'Tích hợp các thành phần và ràng buộc nghiệp vụ; đánh giá mỗi tuyên bố bằng kiểm thử tương ứng.',
 'Đã dùng ba mô hình khuôn mặt nên có thể tuyên bố giải quyết mọi kiểu giả mạo.',
 'Có bộ kiểm thử backend thành công nên mô hình chắc chắn tổng quát tốt với người mới.',
 'Có giao dịch trên testnet nên có thể xem dữ liệu đầu vào là hoàn toàn chính xác.'
],'Nêu rõ đóng góp tích hợp, luồng nghiệp vụ và các giới hạn của từng loại bằng chứng.','Độ đúng chức năng, chất lượng mô hình và tính toàn vẹn sau neo là ba câu hỏi kiểm chứng khác nhau.','Một tuyên bố nào trong bản thảo cần dữ liệu thực nghiệm mới trước khi đưa lên slide?',['verify','contract']);
mcq('S05','scope',2,'Một câu hỏi vừa “đếm người trễ” vừa “tạo đơn nghỉ” nên được xử lý ra sao?',[
 'Yêu cầu làm rõ hoặc tách từng yêu cầu trước khi thực thi nghiệp vụ.',
 'Lấy nhãn có điểm cao nhất rồi âm thầm bỏ yêu cầu còn lại.',
 'Thực hiện cả hai bằng cách gộp slot vào handler của nhãn đầu tiên.',
 'Để JEV chọn quyền quản trị tạm thời để thực hiện được cả hai.'
],'Hybrid phát hiện dấu hiệu nhiều ý định thì trả clarify, không tự gộp nghiệp vụ.','Một nhãn không biểu diễn đầy đủ hai hành động độc lập. Thực thi một phần âm thầm có thể làm người dùng hiểu sai, đặc biệt với thao tác ghi.','Bộ phát hiện nhiều ý định hiện tại có bao phủ mọi cách nói không? Vì sao cần nêu giới hạn?',['fusion','nlu','hybrid']);
mcq('F01','face',1,'Vì sao cần phân biệt YOLO, dlib và MiniFASNet trong pipeline?',[
 'YOLO tìm vùng mặt; dlib tạo embedding để so khớp; MiniFASNet hỗ trợ kiểm tra giả mạo.',
 'YOLO xác định tên; dlib kiểm tra người thật; MiniFASNet tạo mã nhân viên.',
 'YOLO phân loại câu hỏi; dlib tìm vùng mặt; MiniFASNet phân quyền người dùng.',
 'Cả ba đều dự đoán danh tính, vì vậy có thể cộng trực tiếp các điểm đầu ra.'
],'Ba mô hình giải ba nhiệm vụ: phát hiện, nhận dạng và chống giả mạo.','Thấy khuôn mặt không đồng nghĩa biết danh tính; khớp danh tính cũng không đủ loại trừ ảnh chụp hoặc màn hình phát lại.','Nếu ảnh in vẫn có embedding gần đúng, thành phần nào cần ngăn luồng tiếp theo?',['face','config']);
mcq('F02','face',1,'Vector dlib 128 chiều nên được hiểu như thế nào?',[
 'Biểu diễn đặc trưng để tính khoảng cách, không phải mã định danh duy nhất được bảo đảm.',
 'Danh sách 128 người mà hệ thống đã được huấn luyện nhận dạng.',
 '128 xác suất độc lập cho biết người đứng trước camera thuộc phòng ban nào.',
 'Ảnh gốc được nén nên có thể coi là không còn dữ liệu sinh trắc học.'
],'Embedding là biểu diễn số dùng để so sánh độ gần giữa các khuôn mặt.','Ánh sáng, góc mặt và các danh tính tương tự có thể gây chồng lấn. Kích thước vector không phải cam kết không nhầm lẫn, cũng không làm mất tính nhạy cảm của dữ liệu.','Vì sao nhiều mẫu cùng người có thể giúp, nhưng vẫn cần kiểm tra chất lượng mẫu?',['face']);
mcq('F03','face',2,'Điểm khớp 60% hiện tại có nghĩa là gì?',[
 'Ngưỡng trên điểm quy đổi từ khoảng cách; chưa chứng minh xác suất đúng là 60%.',
 'Trong mọi 100 lần chấm công, chắc chắn có đúng 60 lần nhận dạng chính xác.',
 'Mô hình đã được hiệu chỉnh nên xác suất người đó đúng danh tính bằng 0,60.',
 'YOLO phát hiện đúng 60% vùng mặt, nên dlib được phép bỏ qua so khớp.'
],'60 là ngưỡng cấu hình của điểm khớp; không được diễn giải thành xác suất đúng đã hiệu chỉnh.','Hàm distance_to_confidence_percentage quy đổi khoảng cách theo công thức. Muốn phát biểu xác suất cần đánh giá hiệu chỉnh trên dữ liệu độc lập phù hợp.','Hạ ngưỡng sẽ tác động thế nào đến chấp nhận nhầm và từ chối nhầm?',['config','face','kiosk']);
mcq('F04','face',2,'Vì sao kiosk giữ cùng danh tính ổn định khoảng 3 giây?',[
 'Giảm việc chốt từ một kết quả thoáng qua; vẫn phải qua các điều kiện AI và backend.',
 'Biến mọi điểm khớp thành xác suất chính xác 100% sau ba giây.',
 'Thay thế kiểm tra MiniFASNet vì một ảnh giả không thể tồn tại đủ ba giây.',
 'Bảo đảm mọi endpoint của backend đã tự đo lại ba giây bằng camera.'
],'Kiosk có FACE_HOLD_MS = 3000 và chỉ chốt khi cùng danh tính tiếp tục đạt điều kiện.','Ổn định theo thời gian hỗ trợ trải nghiệm và giảm dao động. Nó không chứng minh chống giả mạo tuyệt đối, cũng không thay validation ở API.','Nếu trong thời gian giữ chuyển sang người khác, bộ đếm nên tiếp tục hay đặt lại?',['kiosk']);
mcq('F05','face',2,'Cắt ROI theo khung hướng dẫn trên kiosk có mục đích gì?',[
 'Đưa vùng được hướng dẫn vào ảnh xử lý, giảm ảnh hưởng phần ngoài khung và đồng bộ trải nghiệm.',
 'Bảo đảm người trong khung chắc chắn thuộc danh bạ nhân viên.',
 'Thay toàn bộ kiểm tra số lượng khuôn mặt và độ sống ở phía AI.',
 'Mã hóa sinh trắc học để backend không còn cần kiểm tra đầu vào.'
],'Kiosk tính vùng crop từ hình học video và khung rồi gửi ảnh vùng đó để dự đoán.','Khung hiển thị và tọa độ ảnh thật có thể khác do tỉ lệ và cách hiển thị video. Crop sai gây nhận nhầm người ngoài khung hoặc mất khuôn mặt.','Bạn sẽ kiểm tra ROI thế nào khi thay đổi kích thước cửa sổ hoặc tỉ lệ camera?',['kiosk']);
mcq('F06','face',2,'Không có mặt, mặt chưa biết và nghi giả mạo có nên dùng chung thông báo “thành công” không?',[
 'Không; đây là các trạng thái khác nhau, cần phản hồi và ngăn ghi phù hợp.',
 'Có; cả ba chỉ là các mức điểm khác nhau của cùng danh tính đã xác thực.',
 'Có; ghi trước rồi người quản lý tự loại các kết quả không hợp lệ sau.',
 'Không có mặt thì dùng danh tính lần trước; hai trường hợp kia mới từ chối.'
],'Không có mặt cần điều chỉnh vị trí; mặt chưa biết cần kiểm tra đăng ký hoặc điều kiện ảnh; nghi giả mạo phải từ chối.','Gộp trạng thái che mất nguyên nhân và dễ tái sử dụng danh tính cũ. Kiosk phải reset trạng thái giữ khi điều kiện không còn đạt.','Bạn sẽ thông báo lỗi dịch vụ AI thế nào để không nhầm với “nhân viên chưa đăng ký”?',['kiosk','face']);
mcq('F07','face',3,'Vì sao chưa đủ khi chỉ chọn embedding có khoảng cách nhỏ nhất?',[
 'Luôn có ứng viên gần nhất; cần ngưỡng và khoảng cách phân biệt với danh tính kế tiếp.',
 'Khoảng cách nhỏ nhất luôn bằng không nên không cần kiểm tra thêm.',
 'Ứng viên đứng đầu luôn là người đúng nếu danh bạ có ít nhất hai người.',
 'Chỉ cần tên ứng viên trùng một phần với tên đăng nhập để bỏ qua khoảng cách.'
],'Ứng viên tốt nhất vẫn có thể là người lạ hoặc khó phân biệt với người thứ hai.','Face service kết hợp ngưỡng điểm với ambiguity gate theo margin và ratio giữa hai danh tính tốt nhất. Không đạt thì fail-closed, không công bố danh tính như đã khớp.','Vì sao so hai mẫu của cùng một người không thay cho so hai danh tính?',['face','config']);
mcq('F08','face',2,'Tại sao không nên cộng điểm YOLO, điểm khớp dlib và điểm liveness thành một phần trăm chung?',[
 'Chúng đo các nhiệm vụ khác nhau và không có thang xác suất chung đã được xác thực.',
 'Vì cả ba đều là độ chính xác thực nghiệm giống hệt nhau nên cộng sẽ bị trùng.',
 'Vì YOLO không trả điểm nào, chỉ hai mô hình còn lại có dữ liệu số.',
 'Vì MiniFASNet đã thay thế nhận dạng danh tính nên các điểm khác luôn vô nghĩa.'
],'Mỗi điểm gắn với một điều kiện riêng; các cổng kiểm tra cần được giải thích tách biệt.','Phát hiện mặt, gần nhau về embedding và dấu hiệu sống không tương đương. Trung bình các điểm có thể che một điều kiện nguy hiểm đang không đạt.','Nếu khớp rất cao nhưng liveness không đạt, kết quả nghiệp vụ phải ra sao?',['config','face','kiosk']);
mcq('N01','nlu',1,'PhoBERT và bộ trích xuất slot cung cấp những gì cho backend?',[
 'Nhãn ý định và tham số nghiệp vụ để backend kiểm tra rồi gọi handler phù hợp.',
 'Một truy vấn MongoDB tùy ý và quyền của người dùng do mô hình tự suy ra.',
 'Bản ghi chấm công hoàn chỉnh có thể ghi thẳng không cần đối chiếu ca làm.',
 'Chuỗi trả lời tự do đủ thay thế toàn bộ kiểm tra dữ liệu trong backend.'
],'NLU phân loại ý định và trích xuất slot; backend sở hữu thực thi nghiệp vụ.','Giữ đầu ra có cấu trúc làm ranh giới kiểm tra rõ hơn. Slot có thể sai hoặc thiếu nên vẫn phải được xác thực theo actor và quy tắc nghiệp vụ.','Ngày đúng định dạng nhưng không tồn tại trong lịch cần được xử lý ở đâu?',['nlu','hybrid']);
mcq('N02','nlu',2,'Cascade và parallel khác nhau chủ yếu ở điều gì?',[
 'Cascade gọi JEV khi cần xử lý bất định; parallel chạy local và remote cùng lúc.',
 'Cascade bỏ PhoBERT; parallel bỏ JEV để giảm độ trễ.',
 'Cascade tự tăng quyền quản lý; parallel chỉ cho nhân viên dùng.',
 'Cascade dùng 49 nhãn; parallel chỉ dùng một nhãn out_of_scope.'
],'Hai chiến lược khác thời điểm gọi provider và không gian ứng viên được gửi.','Cascade có thể giảm số lần gọi remote; parallel có thể giảm thời gian chờ tuần tự nhưng phát sinh lời gọi thường xuyên hơn. Chất lượng cần đo theo từng cấu hình.','Nếu thêm ngữ cảnh rút gọn, lý do gọi JEV có thể thay đổi thế nào?',['nlu','jev']);
mcq('N03','nlu',3,'Một phản hồi JEV có choice hợp lệ và confidence cao đã đủ để thực thi chưa?',[
 'Chưa; cần kiểm tra schema, nhãn, phân phối và chính sách quyết định, rồi backend kiểm quyền.',
 'Đủ; confidence cao chứng minh người dùng đã được phép thực hiện nghiệp vụ.',
 'Đủ; choice của provider là kết quả cuối cùng nên bỏ qua bất đồng với PhoBERT.',
 'Chưa; phải cho JEV đăng nhập MongoDB để xác nhận danh tính của người hỏi.'
],'Choice là lựa chọn của provider trong tập tiêu chí, không phải lệnh thực thi có quyền.','Adapter kiểm tra hợp đồng đầu ra; policy quyết định nhận hay làm rõ. Provider không thay quyền backend và không trực tiếp tra cứu cơ sở dữ liệu.','Vì sao choice phải thuộc tập ứng viên đã gửi?',['jev','nlu','hybrid']);
mcq('N04','nlu',3,'Vì sao không dùng trực tiếp confidence của JEV làm xác suất đúng của tác vụ?',[
 'Thống kê provider và xác suất đúng nghiệp vụ khác nhau; cần bằng chứng hiệu chỉnh phù hợp.',
 'Vì mọi confidence của JEV đều bằng độ chính xác tổng thể của PhoBERT.',
 'Vì confidence chỉ phụ thuộc độ dài câu nên luôn có thể bỏ qua mọi validation.',
 'Vì probability của từng choice luôn không phụ thuộc các choice được đưa ra.'
],'Code tách thống kê provider khỏi quyết định; fusion cần artifact hiệu chỉnh phù hợp.','Phân phối choice có điều kiện theo tập ứng viên. Ngay cả một phân phối hợp lệ cũng chưa chứng minh xác suất thành công nghiệp vụ trên dữ liệu thực tế.','Đổi từ full15 sang top-k có thể làm giá trị xác suất thay đổi vì sao?',['fusion','jev']);
mcq('N05','nlu',2,'Nếu JEV timeout trong một câu mà hybrid đang cần trợ giúp, phản hồi nào đúng với policy hiện tại?',[
 'Ghi lý do và chuyển clarify khi không có quyết định đủ tin cậy để giải quyết bất định.',
 'Dùng nhãn đầu tiên của danh sách để bảo đảm luôn trả kết quả nghiệp vụ.',
 'Tự tăng confidence PhoBERT lên mức tối đa để tránh làm phiền người dùng.',
 'Gọi trực tiếp MongoDB từ trình duyệt khi provider không hoạt động.'
],'Timeout được adapter trả thành lý do; nếu needs_remote mà thiếu quyết định thì hybrid làm rõ.','Cần phân biệt lỗi JEV bên trong một lần hybrid với lỗi HTTP toàn lời gọi hybrid ở backend, nơi có thể fallback PhoBERT. Fallback không chứng minh kết quả chắc chắn đúng.','Nếu hai mô hình bất đồng và không có fusion hợp lệ, tại sao hỏi lại là hợp lý?',['jev','nlu','hybrid']);
mcq('N06','nlu',3,'Artifact fusion hiệu chỉnh trên full15 có thể áp vào mọi lời gọi top-k không?',[
 'Không; policy kiểm tra tập ứng viên, chiến lược, vai trò, ngữ cảnh và model phù hợp.',
 'Có; nhãn đầu ra là chuỗi nên mọi phân phối đều có thể trộn nguyên trạng.',
 'Có; chỉ cần chuẩn hóa tổng bằng một thì dữ liệu hiệu chỉnh không còn quan trọng.',
 'Không; chỉ cần đổi tên artifact là có thể coi hai điều kiện đã tương đương.'
],'fusion_scope_matches hạn chế áp dụng artifact vào đúng phạm vi đã khai báo.','Đổi tập lựa chọn hay ngữ cảnh làm thay đổi câu hỏi đặt cho provider. Hiệu chỉnh ở một điều kiện không tự có hiệu lực ở điều kiện khác.','Model provider đổi phiên bản cần được kiểm tra thế nào trước khi dùng artifact cũ?',['fusion','nlu']);
mcq('N07','nlu',2,'Vì sao clarify không gọi ngay một handler trong danh sách gợi ý?',[
 'Người dùng chưa chọn ý định; shortlist phải ràng buộc phiên và quyền trước khi được tiêu thụ.',
 'Vì clarify đã là một nhãn nghiệp vụ để ghi đơn nghỉ phép tạm thời.',
 'Vì backend chờ trình duyệt tự gửi một intent bất kỳ ngoài shortlist.',
 'Vì mọi gợi ý đều được phép cho mọi vai trò sau khi mô hình đã đề xuất.'
],'Clarify là một trạng thái hội thoại chưa được thực thi nghiệp vụ.','Backend lưu shortlist đã lọc quyền trong phiên của chủ sở hữu. Chỉ chấp nhận lựa chọn còn hợp lệ; thao tác điều hướng hoặc tin mới tiêu thụ danh sách cũ.','Một nút gợi ý cũ bị phát lại sau tin nhắn mới có nên được thực thi không?',['hybrid']);
mcq('N08','nlu',2,'Khi người dùng hỏi số người đi trễ trong 7 ngày, kết quả nào tránh diễn giải sai?',[
 'Chuỗi số lượng theo từng ngày, với khoảng ngày được backend xác thực.',
 'Cộng mọi số ngày rồi gọi đó là số nhân viên duy nhất bị trễ.',
 'Chỉ thêm nhãn “7 ngày” trên giao diện nhưng vẫn truy vấn ngày hôm nay.',
 'Bỏ tất cả Chủ nhật kể cả khi người dùng nêu rõ ngày và có phân ca.'
],'Các intent theo ngày dùng daily_series; không tự biến tổng lượt thành số người phân biệt.','Một người có thể xuất hiện nhiều ngày. Range phải đến tham số truy vấn thực, còn các quy tắc phân ca và nghỉ phép quyết định từng ngày.','Số lượt trễ và số nhân viên có ít nhất một lần trễ khác nhau thế nào?',['hybrid']);
mcq('N09','nlu',2,'Vì sao xử lý ngày phải thống nhất theo Asia/Ho_Chi_Minh?',[
 'Ngày nghiệp vụ có thể lệch ngày UTC; biên ngày sai sẽ đưa bản ghi sang khoảng khác.',
 'Vì MongoDB không lưu được thời gian UTC nên phải lưu mọi giá trị dưới dạng tên ngày.',
 'Vì trình duyệt người dùng luôn ở Việt Nam nên chỉ cần lấy múi giờ client.',
 'Vì có múi giờ đúng thì không còn cần kiểm tra ngày đảo ngược hoặc không tồn tại.'
],'Backend chuẩn hóa ngày nghiệp vụ Việt Nam và kiểm tra biên khoảng.','Nửa đêm Việt Nam tương ứng 17:00 UTC ngày trước. Lệch biên có thể làm sai tổng hợp, kể cả khi câu hỏi NLU được phân loại đúng.','Bạn sẽ kiểm tra bản ghi ngay trước và ngay sau biên kết thúc khoảng ra sao?',['hybrid']);
mcq('B01','security',1,'Tại sao ẩn nút trên giao diện không đủ để bảo vệ một API quản trị?',[
 'Người dùng có thể gọi API trực tiếp; backend phải xác thực và kiểm quyền mỗi thao tác.',
 'Vì nút chỉ được ẩn sau khi JEV tự thay đổi role của tài khoản.',
 'Vì giao diện React luôn mã hóa toàn bộ request nên API không cần quyền.',
 'Vì tất cả tài khoản đăng nhập đều có quyền ghi vào dữ liệu của mọi người.'
],'Quyền phải được thực thi ở backend, không phụ thuộc UI hay suy đoán của AI.','Request không bắt buộc đi qua các nút có sẵn. Middleware và handler cần ràng buộc quyền với actor đã xác thực và dữ liệu trong DB.','Bạn sẽ thử trường hợp gọi trực tiếp endpoint bằng token nhân viên như thế nào?',['userRoutes','hybrid']);
mcq('B02','security',2,'AI nhận employee_summary với mã nhân viên khác do client gửi; nhân viên thường được xem gì?',[
 'Chỉ dữ liệu được backend cho phép theo actor, trong trường hợp này là hồ sơ của chính mình.',
 'Mọi hồ sơ vì mô hình nhận đúng nhãn employee_summary.',
 'Mọi hồ sơ cùng họ tên vì tên là thông tin do người dùng biết trước.',
 'Mọi phòng ban nếu confidence vượt một ngưỡng tự chọn trên giao diện.'
],'Backend ràng buộc nhân viên với dữ liệu của chính họ; mã trong slot không cấp quyền.','NLU hiểu yêu cầu không đồng nghĩa yêu cầu được phép. Giữ actor ở backend ngăn client hoặc AI mạo danh người khác.','Quản lý được tổng hợp phòng ban nào, và ai được so sánh các phòng ban?',['hybrid']);
mcq('B03','security',2,'Vì sao đăng nhập hợp lệ chưa đủ chứng minh lần quét mặt vừa thành công?',[
 'Login JWT và bằng chứng face_verification có mục đích, loại và issuer cần kiểm tra riêng.',
 'Vì mọi login JWT đã chứa ảnh camera mới nhất và điểm liveness hiện tại.',
 'Vì token có cùng định dạng JWT nên mặc nhiên dùng thay nhau được.',
 'Vì chỉ cần client gửi confidence cao là backend có thể bỏ qua token.'
],'Attendance API cần verificationToken được ký phù hợp và kiểm tra type, issuer cùng claims.','Đăng nhập chứng minh phiên người dùng; bằng chứng AI ràng buộc kết quả nhận diện. Dùng nhầm loại token làm mất ranh giới giữa hai bước xác thực.','Backend lấy employeeCode và điểm số từ token hay từ trường người dùng tự gửi?',['attendance']);
mcq('B04','security',2,'Client sửa confidence trong body thành 100; backend nên dựa vào đâu?',[
 'Bằng chứng đã ký và các điều kiện hợp lệ ở server, không tin điểm tự khai trong body.',
 'Chọn giá trị lớn hơn giữa điểm ký và điểm trong body để giảm từ chối nhầm.',
 'Tin body vì request được gửi từ giao diện kiosk chính thức.',
 'Bỏ kiểm tra điểm liveness vì confidence danh tính đã đạt 100.'
],'Controller lấy định danh, confidence và liveness từ verificationToken đã xác thực.','Dữ liệu client có thể bị sửa. Chữ ký bảo vệ tính toàn vẹn của bằng chứng do bên phát hành được tin cậy tạo, nhưng vẫn cần kiểm tra nội dung và hạn dùng.','Một token đúng chữ ký nhưng sai type có được chấp nhận không?',['attendance']);
mcq('B05','security',2,'MongoDB không sẵn sàng khi ghi chấm công; fail-closed có nghĩa gì?',[
 'Từ chối ghi nhận thành công và báo lỗi dịch vụ, để không tạo xác nhận không có bản ghi.',
 'Báo thành công trước vì ảnh nhận diện đúng thì chắc chắn dữ liệu sẽ tự lưu sau.',
 'Tự lấy danh bạ encodings.pkl cũ để tạo ra một nhân viên mới.',
 'Ghi vào bất cứ collection nào đang truy cập được rồi bỏ qua quan hệ dữ liệu.'
],'API ghi chấm công trả lỗi khi DB không sẵn sàng; không phát thành công giả.','Thông báo thành công là một cam kết nghiệp vụ. Nếu chưa có lưu trữ đáng tin cậy thì xác nhận đó có thể gây mất công hoặc tranh chấp.','Có cache đọc được không đồng nghĩa được phép ghi offline; vì sao?',['attendance','face']);
mcq('B06','security',2,'Đường đăng ký khuôn mặt hiện tại được kiểm soát như thế nào?',[
 'Admin chọn nhân viên, chụp mẫu camera; backend kiểm quyền trước khi chuyển sang Central AI.',
 'Mọi nhân viên tự sửa embedding của người khác trực tiếp từ kiosk.',
 'Face AI tự tạo hồ sơ mới cho bất kỳ khuôn mặt lạ nào nhìn thấy.',
 'Chỉ cần giao diện ghi “quản lý” là route tự cho manager quyền enrollment.'
],'UI hiện tại thu mẫu qua webcam; route face-enroll được giới hạn admin.','Quyền ở route có giá trị thực thi cao hơn mô tả UI hoặc bản thảo cũ. Đăng ký sai danh tính sẽ làm hỏng cơ sở so khớp của mọi lần chấm công sau.','Nếu giao diện mô tả quyền rộng hơn route, bằng chứng nào quyết định hành vi thực?',['enroll','userRoutes']);
mcq('D01','data',2,'Sáu tiến trình đang chạy có đủ để gọi là sáu microservice độc lập hoàn toàn không?',[
 'Chưa; cần xem quyền sở hữu dữ liệu, phụ thuộc, hợp đồng và khả năng triển khai độc lập.',
 'Đủ; cứ khác cổng là độc lập cả dữ liệu, lỗi vận hành và cơ chế xác thực.',
 'Đủ; dùng chung MongoDB chứng minh các dịch vụ không còn ràng buộc schema.',
 'Chưa; chỉ cần đổi tên thư mục thành microservices là đủ điều kiện còn lại.'
],'Có thể mô tả hệ thống theo hướng microservices; mức độc lập phải được phân tích, nhất là khi chia sẻ MongoDB.','Tách tiến trình giúp phân công và triển khai thành phần, nhưng schema dùng chung và xác thực liên thông vẫn tạo coupling. Đếm cổng không đo được mức tự chủ.','Nếu đổi cấu trúc users.face, những thành phần nào phải được kiểm tra tương thích?',['verify','centralDb','db','face']);
mcq('D02','data',2,'Phân công Central quản trị và Employee BFF phục vụ nhân viên có nghĩa BFF không được đọc dữ liệu không?',[
 'Không; nhân viên vẫn có các API đọc chấm công, ca, nghỉ phép, KPI trong phạm vi cá nhân.',
 'Có; Employee BFF chỉ có một API ghi chấm công và không phục vụ dashboard.',
 'Có; toàn bộ dữ liệu cá nhân chỉ được đọc từ blockchain công khai.',
 'Không; vì dùng chung DB nên BFF có thể bỏ mọi điều kiện phạm vi người dùng.'
],'Quyền sở hữu nghiệp vụ không có nghĩa cấm mọi thao tác đọc ở thành phần khác.','Route nhân viên cung cấp chức năng tự phục vụ có xác thực. Điều cần giữ là actor và phạm vi dữ liệu, cùng hợp đồng giữa các thành phần.','Dùng chung collection có tự làm cho nhân viên được đọc hồ sơ đồng nghiệp không?',['employee','hybrid']);
mcq('D03','data',2,'Sau khi admin thay embedding, vì sao cần quan tâm cache của Face AI?',[
 'Face AI có danh bạ trong bộ nhớ; cache cũ có thể khiến nhận diện chưa phản ánh dữ liệu mới.',
 'Vì MongoDB tự phát mọi thay đổi đến mọi mảng Python mà không cần cơ chế đồng bộ.',
 'Vì embedding mới chỉ ảnh hưởng chatbot, không liên quan nhận dạng khuôn mặt.',
 'Vì chỉ cần đổi tên người trên UI là vector của Face AI tự thay đổi.'
],'Cần kiểm tra đường cập nhật danh bạ và làm mới dữ liệu Face AI sử dụng.','Bản ghi DB là nguồn dữ liệu, còn bộ nhớ phục vụ suy luận là một bản sao tại thời điểm nạp. Hai nơi có thể lệch nhau nếu refresh lỗi.','Khi mất MongoDB, tại sao nạp danh bạ file cũ có thể vi phạm dữ liệu đã thu hồi?',['face','enroll']);
mcq('D04','data',3,'Một thay đổi schema dùng chung cần ưu tiên kiểm tra gì?',[
 'Tương thích cả bên ghi, bên đọc và dữ liệu cũ; tránh cập nhật một dịch vụ rồi mặc định mọi nơi hiểu.',
 'Chỉ giao diện admin vì mọi backend đều tự suy ra trường mới.',
 'Chỉ tên collection, còn kiểu dữ liệu không ảnh hưởng truy vấn.',
 'Chỉ blockchain vì mọi bản ghi MongoDB được hợp đồng xác thực tự động.'
],'Schema là hợp đồng ngầm giữa nhiều thành phần; cần kiểm tra luồng xuyên dịch vụ.','Ví dụ embedding khác dạng hoặc ngày nghiệp vụ khác cách chuẩn hóa có thể không lỗi ngay lúc ghi nhưng gây sai ở nhận diện, tổng hợp hoặc hash.','Bạn sẽ triển khai thay đổi schema theo từng bước để dữ liệu cũ vẫn đọc được ra sao?',['crossTests','face','centralDb','db']);
mcq('W01','web3',1,'MERN mô tả phần nào của toàn hệ thống?',[
 'MongoDB, Express, React, Node.js; các dịch vụ AI Python là thành phần bổ sung.',
 'MiniFASNet, Ethereum, ResNet và NLU; tất cả đều nằm trong trình duyệt.',
 'Một framework thay thế toàn bộ Python và hợp đồng Solidity.',
 'Một cơ chế đồng thuận blockchain được dùng để lưu ảnh camera.'
],'MERN mô tả nhóm công nghệ web, không bao phủ mọi công nghệ của hệ thống.','Phân biệt stack web với thành phần AI và Web3 giúp giải thích đúng vì sao có ranh giới dịch vụ và trao đổi API.','Tại sao tách suy luận Python khỏi event loop của backend web có thể có lợi?',['verify','nlu','contract']);
mcq('W02','web3',2,'Neo Merkle root lên blockchain bảo đảm điều gì chính xác nhất?',[
 'Hỗ trợ phát hiện dữ liệu được băm khác với trạng thái đã neo khi có quy trình đối chiếu đúng.',
 'Ngăn tuyệt đối mọi lệnh sửa hoặc xóa bản ghi trong MongoDB.',
 'Chứng minh người trong bản ghi thực sự đứng trước camera tại thời điểm đó.',
 'Tự sửa mọi bản ghi chấm công sai trước thời điểm tạo hash.'
],'Neo hỗ trợ kiểm tra tính toàn vẹn của dữ liệu được cam kết tại thời điểm neo.','Hash không chứng minh dữ liệu đầu vào đúng. DB vẫn có thể bị sửa; đối chiếu dữ liệu được băm mới có thể phát hiện khác biệt với root đã neo.','Nếu dữ liệu đã sai trước khi neo thì blockchain có biết không?',['contract','anchor']);
mcq('W03','web3',2,'Vì sao chỉ đưa hash lên hợp đồng và giữ dữ liệu chi tiết off-chain?',[
 'Giảm dữ liệu công khai và chi phí ghi, đồng thời giữ khả năng đối chiếu cam kết.',
 'Vì hash tự chứa toàn bộ ảnh và có thể giải nén thành hồ sơ nhân viên.',
 'Vì lưu hash làm MongoDB không còn cần sao lưu hoặc kiểm soát truy cập.',
 'Vì người dùng có thể tra mọi thông tin nhân viên chỉ bằng root công khai.'
],'Contract chỉ lưu dataHash và timestamp theo khóa báo cáo; dữ liệu nghiệp vụ nằm ngoài chuỗi.','Để kiểm tra, vẫn cần dữ liệu đầu vào đúng cách chuẩn hóa và cơ chế băm tương ứng. Hash không thay quản lý dữ liệu, quyền truy cập hoặc sao lưu.','Nếu mất dữ liệu off-chain, chỉ giữ root có khôi phục được dữ liệu không?',['contract','anchor']);
mcq('W04','web3',2,'AttendanceAnchor ngăn ghi đè cùng reportKey bằng cách nào?',[
 'Chỉ owner được logHash và khóa đã neo bị từ chối ghi lại.',
 'Cho mọi địa chỉ sửa root, miễn là gửi timestamp lớn hơn.',
 'Cho người dùng sửa MongoDB là hợp đồng tự cập nhật root tương ứng.',
 'Dùng MiniFASNet xác minh người gọi trước mỗi giao dịch Ethereum.'
],'onlyOwner kiểm soát người ghi; timestamp đã tồn tại làm lần neo lại cùng khóa bị từ chối.','Ràng buộc của contract bảo vệ trạng thái neo trên chuỗi. Nó không tự kiểm tra chất lượng dữ liệu off-chain hay quy trình quản lý khóa ví.','Nếu cần đính chính báo cáo đã neo, nên thiết kế phiên bản và lịch sử như thế nào?',['contract']);
mcq('T01','testing',2,'Lặp 228 câu thành 1.000 request giúp đánh giá gì, và giới hạn ở đâu?',[
 'Hữu ích quan sát tải trên luồng lặp; không tạo ra 1.000 ví dụ ngôn ngữ độc lập.',
 'Tự tăng độ đa dạng lên 1.000 câu mới vì mỗi request có thời gian khác nhau.',
 'Loại bỏ mọi trùng lặp train/test vì số request lớn hơn số câu gốc.',
 'Chứng minh mọi câu tiếng Việt mới đều đạt chất lượng tương đương tập này.'
],'Số request là đơn vị tải; số câu độc lập mới liên quan đến độ đa dạng mẫu đánh giá.','Lặp lại cùng câu giữ nguyên nhiều đặc điểm ngôn ngữ. Báo cáo phải công bố provenance, trùng lặp và ảnh hưởng của việc phát triển trên tập kiểm thử.','Một tập kiểm thử tổng quát tốt hơn cần khác dữ liệu phát triển theo những yếu tố nào?',['verify']);
mcq('T02','testing',3,'Backend test dùng NLU stub đã pass; có thể kết luận gì?',[
 'Luồng và ràng buộc được kiểm thử hoạt động với phản hồi giả lập đã thiết lập.',
 'Provider thật luôn sẵn sàng và không bao giờ timeout.',
 'Độ chính xác mô hình trên dữ liệu mới đã đạt chất lượng triển khai.',
 'Độ trễ toàn hệ thống dưới tải thật đã được đo đầy đủ.'
],'Test kiểm chứng phạm vi được dựng trong bài test; không tự đo chất lượng hoặc khả dụng model thật.','Stub giúp cô lập nghiệp vụ nhưng loại bỏ nhiều biến số của suy luận và mạng. Cần tách bằng chứng chức năng, mô hình, tải và trải nghiệm thực tế.','Cần thêm loại kiểm tra nào để khẳng định luồng camera tới DB hoạt động thật?',['verify']);
mcq('T03','testing',3,'Nếu hybrid và PhoBERT cho cùng toàn bộ nhãn trên luồng đã đo, nên kết luận gì?',[
 'Chưa có cải thiện độ đúng nhãn trên luồng đó; vẫn phân tích clarify, chi phí và độ phủ riêng.',
 'Hybrid luôn tốt hơn vì tên phương pháp có thêm một mô hình.',
 'Hybrid không có ích trong bất kỳ tình huống nào ngoài tập đã đo.',
 'Có thể cộng độ chính xác hai mô hình để tính độ chính xác hybrid.'
],'Báo cáo đúng phạm vi quan sát, tránh suy rộng “luôn tốt hơn” hoặc “luôn vô ích”.','Kết quả giống nhau không chứng minh lợi ích về độ đúng nhãn. Cơ chế từ chối, giải thích bất định, độ trễ và chi phí là các trục đánh giá khác.','Tại sao accuracy trên các câu được chấp nhận cần đi kèm accepted coverage?',['verify']);
mcq('T04','testing',3,'Sau khi sửa heuristic dựa trên lỗi của tập test, nên mô tả kết quả ra sao?',[
 'Thừa nhận tập đã ảnh hưởng phát triển và cần một tập giữ kín mới để đo tổng quát.',
 'Gọi tập đó là hoàn toàn độc lập vì không trực tiếp cập nhật trọng số mô hình.',
 'Tăng số lần chạy cùng tập để biến nó thành dữ liệu mới chưa từng thấy.',
 'Chỉ công bố câu đã sửa đúng để không làm người đọc phân tâm.'
],'Sửa luật theo lỗi test cũng đưa thông tin test vào quá trình phát triển.','Rò rỉ không chỉ nằm ở huấn luyện trọng số. Lựa chọn luật, ngưỡng và cấu hình theo test có thể làm kết quả trên tập đó lạc quan hơn dữ liệu mới.','Bạn sẽ tách train, validation và test theo mục đích ra sao?',['verify']);

oral('O01','scope',2,'Trong 60 giây, hãy giải thích bài toán của luận án cho người chưa biết AI.','Bắt đầu từ nhu cầu ghi nhận và tra cứu chấm công; mô tả camera hỗ trợ xác thực, backend áp quy tắc, chatbot hỗ trợ hỏi dữ liệu, hash giúp đối chiếu sau neo. Kết thúc bằng phạm vi thử nghiệm và một giới hạn.','Đi từ vấn đề đến vai trò của từng thành phần giúp hội đồng đánh giá giá trị thực, tránh chỉ liệt kê tên công nghệ.','Nếu chỉ được giữ một chức năng cốt lõi, bạn chọn gì và tiêu chí nào quyết định?',['hybrid','face','contract']);
oral('O02','scope',3,'Hội đồng hỏi: “Đề tài đã giải quyết triệt để chấm công hộ chưa?” Bạn trả lời thế nào?','Nêu các lớp kiểm soát: so khớp danh tính, chống giả mạo, ổn định kiosk và kiểm tra bằng chứng tại backend. Không khẳng định tuyệt đối; cần dữ liệu về kiểu tấn công, điều kiện camera và lỗi chấp nhận nhầm để đánh giá.','Nhiều lớp giảm các rủi ro khác nhau nhưng không tự tạo bảo đảm tuyệt đối. Một demo thành công không đo được toàn bộ không gian tấn công.','Bạn sẽ ưu tiên thử kiểu tấn công nào và ghi lại kết quả theo tiêu chí gì?',['face','kiosk','attendance']);
oral('O03','face',2,'Vì sao cần cả ba mô hình khuôn mặt? Hãy chỉ ra một lỗi mà mỗi mô hình riêng lẻ không giải quyết được.','YOLO tìm mặt nhưng chưa biết là ai; dlib so embedding nhưng ảnh in có thể gần đúng; MiniFASNet hỗ trợ phát hiện giả mạo nhưng không cấp quyền hay xác định nhân viên được phép. Backend quyết định nghiệp vụ theo bằng chứng.','Ba nhiệm vụ bổ sung nhau. Phân tích đầu vào, đầu ra và thất bại riêng giúp tránh gọi cả pipeline là một mô hình duy nhất.','Nếu MiniFASNet không sẵn sàng, một điểm nhận dạng cao có đủ để chấp nhận không?',['face','config','attendance']);
oral('O04','face',3,'Nhân viên hợp lệ thường bị từ chối khi thiếu sáng. Có nên hạ ngay ngưỡng 60 xuống thấp hơn?', 'Trước hết kiểm tra chất lượng ảnh, ROI, detection, liveness và khoảng cách embedding để xác định cổng từ chối. Đánh giá thay ngưỡng trên tập validation gồm người thật và người lạ; cân bằng chấp nhận nhầm với từ chối nhầm.','Hạ ngưỡng nhận dạng không sửa được lỗi detector hoặc chống giả mạo; có thể mở thêm chấp nhận sai. Ngưỡng là lựa chọn vận hành cần bằng chứng, không phải mẹo tăng accuracy.','Bạn sẽ tách lỗi phát hiện, nhận dạng và liveness trong log kiểm thử như thế nào?',['config','face','kiosk']);
oral('O05','face',2,'Hai người đổi chỗ trước kiosk trong lúc đang giữ 3 giây. Hãy giải thích hành vi mong muốn và lý do.','Khi danh tính thay đổi hoặc điều kiện không đạt, reset trạng thái giữ; người tiếp theo phải bắt đầu một khoảng ổn định mới. Không mang thời gian hoặc danh tính của người trước sang lần chốt mới.','Bộ đếm phải ràng buộc đúng danh tính được xác nhận. Gộp các quan sát của hai người làm mất ý nghĩa “cùng người ổn định”.','Nếu response chậm về sau khi camera đã thay đổi, bạn sẽ kiểm tra rủi ro nào?',['kiosk']);
oral('O06','face',3,'Kiosk nhận sai tên nhưng điểm khớp khá cao. Bạn khoanh vùng nguyên nhân theo thứ tự nào?', 'Kiểm tra đúng ROI và ảnh; danh bạ enrollment có đúng người, đúng mẫu; cache có mới; khoảng cách tốt nhất và thứ hai; ngưỡng và ambiguity gate. Không dùng mỗi phần trăm trên UI làm bằng chứng danh tính đúng.','Sai có thể ở thu nhận, dữ liệu đăng ký, đồng bộ hoặc quyết định mô hình. Chẩn đoán theo từng tầng tránh điều chỉnh ngưỡng để che lỗi dữ liệu.','Nếu nhầm bắt nguồn từ enrollment sai người, thay model có giải quyết nguồn gốc không?',['face','kiosk','enroll']);
oral('O07','nlu',2,'Hãy lần theo câu “Ai đi trễ hôm qua?” từ giao diện đến dữ liệu và câu trả lời.','UI gửi câu hỏi qua backend có xác thực; NLU phân loại list_late và trích xuất ngày; backend xác thực thời gian Việt Nam, kiểm quyền và phạm vi phòng ban rồi gọi handler truy vấn; UI hiển thị kết quả. Nếu không đủ rõ thì hỏi lại.','Phân loại đúng chỉ là một bước. Trả lời đúng còn phụ thuộc ngày, quyền, dữ liệu ca và kết quả truy vấn thực.','Nếu nhân viên thường gửi câu đó, có nên trả danh sách toàn công ty vì intent đúng không?',['hybrid','nlu']);
oral('O08','nlu',3,'Nếu JEV lỗi hoặc hai mô hình bất đồng, bạn giải thích cơ chế xử lý ra sao?', 'Phân biệt timeout của JEV, lỗi HTTP của toàn hybrid và bất đồng nhãn. Hybrid đang cần remote mà không giải quyết được bất định sẽ clarify; fusion chỉ dùng khi artifact và phạm vi hợp lệ. Backend có fallback PhoBERT khi lời gọi hybrid HTTP lỗi, nhưng vẫn phải kiểm quyền và đầu vào.','Các lỗi nằm ở các tầng khác nhau nên không thể mô tả bằng câu “luôn lấy model còn lại”. Mục tiêu là không biến bất định thành một hành động nghiệp vụ tự tin giả.','Không có artifact hiệu chỉnh thì có thể tự đặt trọng số 50/50 rồi gọi là calibrated không?',['nlu','jev','fusion','hybrid']);
oral('O09','nlu',3,'Tại sao probability trong câu hỏi choice full15 không thể coi giống probability khi chỉ có ba ứng viên?', 'Phân phối được điều kiện hóa theo tập lựa chọn; bỏ nhiều nhãn có thể dồn xác suất vào nhãn còn lại. Phải hiệu chỉnh và đánh giá với cùng chính sách ứng viên, ngữ cảnh, vai trò và model được dùng.','Đổi “câu hỏi” của provider là đổi điều kiện sinh phân phối. Chuẩn hóa tổng bằng một chỉ là điều kiện toán học, không chứng minh khả năng dự báo đúng.','Nếu nhãn thật bị loại khỏi top-k, chọn tốt nhất trong top-k còn có nghĩa gì?',['fusion','jev']);
oral('O10','nlu',2,'Người dùng chọn khoảng ngày nhưng tổng hợp vẫn không đổi. Bạn kiểm tra gì trước khi đổ lỗi cho PhoBERT?', 'Kiểm tra range có được lưu trong phiên, xác thực ở backend và truyền xuống workDates/from/to thật hay chỉ đổi nhãn UI. Kiểm tra dữ liệu ở biên ngày, quyền phạm vi và loại intent theo ngày hay theo kỳ.','NLU có thể đúng nhưng adapter hoặc truy vấn chưa dùng khoảng thời gian. Chẩn đoán đường dữ liệu giải thích được lỗi chính xác hơn đổi model ngay.','Một test có bản ghi ngay ngoài ngày kết thúc sẽ giúp bắt lỗi gì?',['hybrid','verify']);
oral('O11','security',3,'Hội đồng dùng công cụ HTTP gửi role=admin và điểm AI=100 từ client. Hệ thống phải dựa vào những gì?', 'Role đến từ actor được backend xác thực và đối chiếu theo chính sách; điểm và định danh chấm công lấy từ bằng chứng đã ký phù hợp. Kiểm tra quyền, token, type, issuer, hạn dùng, miền giá trị và bản ghi liên quan; không nhận quyền hoặc điểm tự khai.','Đầu vào có vẻ hợp lệ không có nghĩa đáng tin. Ranh giới tin cậy cần được giữ ngay cả khi bỏ qua toàn bộ giao diện.','Có chữ ký đúng nhưng token của mục đích khác thì nguy cơ gì?',['attendance','hybrid','userRoutes']);
oral('O12','security',2,'Manager hỏi tổng hợp phòng ban khác qua chatbot. AI nhận đúng ý định thì backend nên làm gì?', 'Backend kiểm tra phạm vi phòng ban từ dữ liệu actor; manager chỉ tổng hợp phòng ban được phép. So sánh phòng ban là nghiệp vụ admin. Trả từ chối hoặc hướng dẫn phù hợp khi không có quyền.','Độ đúng ngôn ngữ không cấp quyền. Mô hình có thể hiểu một yêu cầu bị cấm hoàn toàn chính xác.','Vì sao lọc ứng viên theo role ở AI vẫn chưa thay được RBAC backend?',['hybrid','jev']);
oral('O13','security',3,'MongoDB lỗi nhưng Face AI vẫn trả một danh tính từ bộ nhớ. Có nên báo chấm công thành công?', 'Không xác nhận ghi thành công khi DB chưa sẵn sàng; controller chặn ghi bằng lỗi dịch vụ. Tách trạng thái suy luận được khỏi trạng thái nghiệp vụ đã được lưu, và hướng dẫn người dùng thử lại theo quy trình.','Một kết quả AI không phải giao dịch chấm công bền vững. Nếu muốn hỗ trợ offline sau này phải thiết kế hàng đợi, xác thực, thời gian và chống trùng; không thể chỉ dùng cache rồi báo thành công.','Bạn sẽ hiển thị thông báo nào để người dùng biết họ chưa có bản ghi?',['attendance','face']);
oral('O14','data',3,'“Sáu tiến trình có bằng sáu microservice độc lập không?” Hãy bảo vệ mô tả kiến trúc một cách chính xác.', 'Nêu sáu thành phần có nhiệm vụ riêng, rồi thừa nhận dùng chung MongoDB và liên thông xác thực tạo coupling. Gọi kiến trúc theo hướng microservices hoặc phân tách dịch vụ, phân tích độ độc lập bằng quyền sở hữu dữ liệu, hợp đồng API và triển khai.','Số cổng chỉ mô tả topology chạy. Tính tự chủ cần chịu được thay đổi schema, lỗi một thành phần và triển khai lệch phiên bản.','Nếu tiến tới database-per-service, vấn đề đồng bộ và nhất quán mới nào xuất hiện?',['verify','centralDb','db','face']);
oral('O15','data',2,'Một nhân viên đã xóa enrollment vẫn được cache nhận ra. Bạn điều tra và giải thích rủi ro thế nào?', 'Xác nhận thao tác xóa được backend cho phép và ghi vào DB; kiểm tra refresh, thời điểm nạp và bản sao trong Face AI. Quyền bị thu hồi cần phản ánh ở dữ liệu nhận diện; không dùng file cũ để phục hồi danh bạ khi nguồn chính lỗi.','Cache tăng tốc đọc nhưng có nguy cơ giữ dữ liệu đã thay đổi. Đây là vấn đề nhất quán dữ liệu có tác động trực tiếp đến danh tính được tin cậy.','Cần test tình huống xóa rồi lập tức quét lại ở những thành phần nào?',['userRoutes','face','enroll']);
oral('O16','web3',3,'“Đã dùng blockchain thì dữ liệu chấm công không thể sai hoặc bị sửa.” Bạn phản biện ra sao?', 'DB vẫn có thể bị chỉnh sửa và dữ liệu đầu vào có thể sai trước khi neo. Root trên chuỗi hỗ trợ đối chiếu các trường đã băm với trạng thái được cam kết. Nó không xác minh sự hiện diện, không sửa sai nguồn và không ngăn quyền ghi DB.','Cần phân biệt tính đúng thực tế với tính toàn vẹn sau cam kết. Một hash của dữ liệu sai vẫn là hash hợp lệ.','Nếu sửa một trường không nằm trong dữ liệu được băm, phép đối chiếu hiện tại có phát hiện không?',['contract','anchor']);
oral('O17','web3',2,'Báo cáo đã neo cần đính chính. Vì sao không nên cố ghi đè cùng reportKey?', 'Contract chặn neo lại cùng khóa. Với thiết kế mở rộng, tạo bản đính chính hoặc phiên bản mới có liên kết tới bản trước, giữ lý do, quyền người sửa và dấu vết; mô tả đây là hướng thiết kế nếu chưa triển khai.','Lịch sử đối chiếu chỉ có ý nghĩa khi các trạng thái cũ vẫn truy vết được. Trình bày rõ phần đã có và phần đề xuất giúp tránh tuyên bố quá mức.','Cần chuẩn hóa dữ liệu và thứ tự các lá thế nào để nhiều lần tính cho cùng báo cáo ra cùng root?',['contract','anchor']);
oral('O18','testing',3,'Hội đồng hỏi “1.000 request có phải 1.000 mẫu kiểm thử độc lập?” Bạn trả lời thế nào?', 'Không: báo cáo hiện có dùng 228 câu duy nhất lặp thành luồng 1.000 request. Giải thích mục tiêu tải và giới hạn đánh giá ngôn ngữ; công bố trùng lặp, ảnh hưởng của tập phát triển và phần đo được tái sử dụng.','Số lần gọi không làm tăng đa dạng ngữ nghĩa tương ứng. Tính độc lập và nguồn dữ liệu quyết định phạm vi suy luận về khả năng tổng quát.','Bạn sẽ tạo bộ test mới để tránh lặp cách diễn đạt và nhiễm dữ liệu như thế nào?',['verify']);
oral('O19','testing',3,'Hãy đề xuất một kế hoạch kiểm thử đủ để bảo vệ luồng chấm công mà không dùng dữ liệu nhân viên thật.', 'Dùng dữ liệu tổng hợp và DB cô lập để kiểm tra quyền, bằng chứng giả, mất DB, người chưa đăng ký, trùng lần chốt và biên thời gian. Bổ sung kiểm thử camera có đồng ý để đo riêng detection, nhận dạng, liveness và luồng UI đến bản ghi; nêu rõ phần chưa đo.','Test nghiệp vụ với stub và test AI thật giải quyết rủi ro khác nhau. Dữ liệu có kiểm soát giúp tái lập và tránh ảnh hưởng hệ thống đang dùng.','Test âm nào quan trọng hơn một video demo thành công duy nhất?',['verify','attendance','kiosk']);
oral('O20','testing',3,'Nếu được thêm một tuần hoàn thiện nghiên cứu, bạn ưu tiên đo gì để làm luận án đáng tin hơn?', 'Ưu tiên khoảng trống bằng chứng có ảnh hưởng lớn: một tập ngôn ngữ giữ kín, chất lượng nhận diện theo điều kiện thực tế, hoặc E2E dưới tải. Chọn theo rủi ro; khóa cấu hình trước đo, ghi provenance và phân biệt accuracy, coverage, latency, chi phí.','Đo lại nhiều lần tập đã dùng để chỉnh luật thường không giải quyết được nghi vấn tổng quát. Một phép đo đúng thiết kế có thể giá trị hơn thêm tính năng chưa được xác minh.','Khi nào giảm tỷ lệ trả lời nhưng tăng độ đúng trên câu được nhận là một đánh đổi hợp lý?',['verify','fusion']);

function recordAnswer(answers, question, choice) {
 if (!question || question.type!=='mcq' || !Number.isInteger(choice) || choice<0 || choice>=question.options.length || Object.prototype.hasOwnProperty.call(answers,question.id)) return answers;
 return {...answers,[question.id]:{choice,correct:choice===question.correct}};
}
function summarize(answers) { const rows=Object.values(answers);return {answered:rows.length,correct:rows.filter(v=>v.correct).length}; }
function shuffled(items, random=Math.random) {const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
const exported={questions,TOPICS,SOURCES,recordAnswer,summarize,shuffled};
if(typeof module!=='undefined' && module.exports) module.exports=exported;
if(typeof document==='undefined') return;
const $=id=>document.getElementById(id);
const STORAGE_KEY='thesis-understanding-v1';
const freshProgress=()=>({version:1,bookmarks:[],ratings:{},attempts:0,correct:0});
let saved=freshProgress(),persist=false,storageOK=true;
try {
 const raw=localStorage.getItem(STORAGE_KEY);
 if(raw){const parsed=JSON.parse(raw);if(parsed.version===1){
  const validIds=new Set(questions.map(q=>q.id));
  saved.bookmarks=Array.isArray(parsed.bookmarks)?[...new Set(parsed.bookmarks.filter(id=>validIds.has(id)))]:[];
  saved.ratings=Object.fromEntries(Object.entries(parsed.ratings||{}).filter(([id,value])=>validIds.has(id)&&['review','understood'].includes(value)));
  saved.attempts=Number.isSafeInteger(parsed.attempts)&&parsed.attempts>=0?parsed.attempts:0;
  saved.correct=Number.isSafeInteger(parsed.correct)&&parsed.correct>=0&&parsed.correct<=saved.attempts?parsed.correct:0;
  persist=true;
 }}
}catch(_){storageOK=false;}
const state={mode:'study',index:0,revealed:false,draft:'',practice:null,defense:null,filter:{search:'',topic:'all',difficulty:'all',learning:'all',bookmarks:false}};
let clockHandle=null;
function announce(message){$('announcer').textContent=message;}
function save(){if(!persist)return;try{localStorage.setItem(STORAGE_KEY,JSON.stringify(saved));}catch(_){storageOK=false;persist=false;$('save-local').checked=false;storageNotice();announce('Trình duyệt không lưu được. Tiến độ vẫn được giữ trong phiên hiện tại.');}}
function storageNotice(){if(!storageOK)$('storage-message').textContent='Trình duyệt không cho phép đọc hoặc lưu dữ liệu cục bộ. Bạn vẫn học bình thường; tiến độ hiện tại chỉ giữ trong phiên này.';}
function el(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;}
function btn(text,cls,action){const node=el('button',cls,text);node.type='button';node.addEventListener('click',action);return node;}
function fold(text){return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();}
function pool(type){const f=state.filter;return questions.filter(q=>(!type||q.type===type)&&(f.topic==='all'||q.topic===f.topic)&&(f.difficulty==='all'||q.level===Number(f.difficulty))&&(!f.bookmarks||saved.bookmarks.includes(q.id))&&(f.learning==='all'||(f.learning==='new'?!saved.ratings[q.id]:saved.ratings[q.id]===f.learning))&&(!f.search||fold([q.prompt,TOPICS[q.topic],q.answer,q.why].join(' ')).includes(fold(f.search))));}
function updateProgress(){const n=Object.values(saved.ratings).filter(v=>v==='understood').length;$('mastery').max=questions.length;$('mastery').value=n;$('mastery-text').textContent=`${n} / ${questions.length} câu đã hiểu`;$('practice-total').textContent=saved.attempts?`${saved.correct} / ${saved.attempts} lượt trả lời đúng`:'Chưa có lượt luyện tập';save();}
function focusWorkspace(){$('workspace').focus({preventScroll:true});$('workspace').scrollIntoView({block:'start',behavior:'auto'});}
function setRating(q,value,buttonGroup){saved.ratings[q.id]=value;updateProgress();for(const b of buttonGroup.children)b.setAttribute('aria-pressed',String(b.dataset.rating===value));announce(`Đã đánh dấu ${value==='understood'?'đã hiểu':'cần ôn lại'} cho ${q.id}.`);}
function ratings(q){const box=el('div','rating');box.append(el('p','', 'Tự đánh giá sau khi giải thích được bằng lời của mình:'));const row=el('div','action-row');for(const [value,label] of [['review','Cần ôn lại'],['understood','Đã hiểu']]){const b=btn(label,'secondary',()=>setRating(q,value,row));b.dataset.rating=value;b.setAttribute('aria-pressed',String(saved.ratings[q.id]===value));row.append(b);}box.append(row);return box;}
function answerBlock(q,withRating=true){const box=el('div','answer');box.append(el('h3','','GỢI Ý TRẢ LỜI'),el('p','',q.answer),el('h3','','VÌ SAO / CƠ CHẾ'),el('p','',q.why));const follow=el('div','followup');follow.append(el('h3','','THỬ PHẢN BIỆN THÊM'),el('span','',q.followup));box.append(follow);const src=el('div','source','Đối chiếu mã nguồn · đường dẫn tính từ thư mục này');q.sources.forEach(path=>{const a=el('a','',path);a.href=path;a.target='_blank';a.rel='noopener';src.append(a);});box.append(src);if(withRating)box.append(ratings(q));return box;}
function header(q){const box=el('div','card-heading');const meta=el('div','question-meta');meta.append(el('span','badge topic',TOPICS[q.topic]),el('span','badge',LEVELS[q.level]),el('span','badge',q.type==='mcq'?'Trắc nghiệm':'Tự luận'),el('span','badge',q.id));const b=btn(saved.bookmarks.includes(q.id)?'★ Đã lưu':'☆ Lưu câu','bookmark',()=>{const isSaved=saved.bookmarks.includes(q.id);saved.bookmarks=isSaved?saved.bookmarks.filter(id=>id!==q.id):[...saved.bookmarks,q.id];b.textContent=isSaved?'☆ Lưu câu':'★ Đã lưu';b.setAttribute('aria-pressed',String(!isSaved));save();announce(isSaved?'Đã bỏ lưu câu hỏi.':'Đã lưu câu hỏi.');});b.setAttribute('aria-pressed',String(saved.bookmarks.includes(q.id)));b.setAttribute('aria-label',`Lưu câu hỏi ${q.id}`);box.append(meta,b);return box;}
function criticalPrompt(){const box=el('p','thinking');box.append(el('strong','','DỪNG 20 GIÂY TRƯỚC KHI XEM GỢI Ý'),document.createTextNode('Quyết định là gì? Vì sao? Nếu một điều kiện thay đổi, điều gì có thể sai?'));return box;}
function draftField(text,onInput){const box=el('div');const label=el('label','draft-label','Phác thảo lập luận của bạn (tùy chọn, không chấm tự động)');label.htmlFor='answer-draft';const input=el('textarea');input.id='answer-draft';input.placeholder='Quyết định → nguyên nhân → bằng chứng → giới hạn…';input.value=text;input.addEventListener('input',()=>onInput(input.value));box.append(label,input);return box;}
function questionCard(q){const card=el('article','question-card');card.append(header(q),el('h2','question-title',q.prompt));return card;}
function empty(message){const box=el('div','empty');box.append(el('h2','','Chưa có câu hỏi phù hợp'),el('p','',message),btn('Bỏ bộ lọc','secondary',clearFilters));$('workspace').append(box);}
function navigateStudy(delta){state.index+=delta;state.revealed=false;state.draft='';render();focusWorkspace();}
function renderStudy(){const list=pool();if(!list.length){empty('Hãy đổi chủ đề, mức độ hoặc bộ lọc đã lưu để tiếp tục.');return;}state.index=Math.min(Math.max(0,state.index),list.length-1);const q=list[state.index];const top=el('div','section-top');top.append(el('span','',`HỌC & HIỂU · ${list.length} câu phù hợp`),el('span','',`${state.index+1} / ${list.length}`));$('workspace').append(top);const card=questionCard(q);card.append(criticalPrompt());if(q.options){const opts=el('ol','options');q.options.forEach((text,i)=>{const item=el('li','option');item.append(el('span','option-letter','ABCD'[i]),el('span','',text));opts.append(item);});card.append(opts);}card.append(draftField(state.draft,value=>{state.draft=value;}));const row=el('div','action-row');const reveal=btn(state.revealed?'Ẩn gợi ý':'Đã suy nghĩ · xem gợi ý','primary',()=>{state.revealed=!state.revealed;render();const target=$('workspace').querySelector('.answer');if(target){target.tabIndex=-1;target.focus({preventScroll:true});}else $('reveal-answer').focus();announce(state.revealed?'Đã mở gợi ý và giải thích.':'Đã ẩn gợi ý.');});reveal.id='reveal-answer';reveal.setAttribute('aria-expanded',String(state.revealed));row.append(reveal);card.append(row);if(state.revealed){if(q.type==='mcq')card.append(el('p','feedback',`Phương án phù hợp: ${'ABCD'[q.correct]}. ${q.options[q.correct]}`));card.append(answerBlock(q));}$('workspace').append(card);const nav=el('div','card-nav');const prev=btn('← Câu trước','secondary',()=>navigateStudy(-1));prev.disabled=state.index===0;const next=btn('Câu tiếp →','secondary',()=>navigateStudy(1));next.disabled=state.index===list.length-1;nav.append(prev,el('span','', 'Tự giải thích trước · đọc gợi ý sau'),next);$('workspace').append(nav);}
function startSession(mode){const list=shuffled(pool(mode==='practice'?'mcq':'oral')).slice(0,mode==='practice'?20:10);if(!list.length)return;state[mode]={ids:list.map(q=>q.id),index:0,answers:{},revealed:{},drafts:{},done:false,timerEnabled:mode==='defense'&&Boolean($('timer-option')?.checked),running:false,elapsed:0,startedAt:0};render();focusWorkspace();announce(`Bắt đầu ${list.length} câu ${mode==='practice'?'trắc nghiệm':'tập bảo vệ'}.`);}
function intro(mode){const isPractice=mode==='practice',list=pool(isPractice?'mcq':'oral'),count=Math.min(list.length,isPractice?20:10);const box=el('div','session-intro');box.append(el('span','session-kicker',isPractice?'TỪ HIỂU ĐẾN VẬN DỤNG':'TẬP NÓI, TẬP LẬP LUẬN'),el('h2','',isPractice?'Một lượt luyện, một điểm cần hiểu thêm.':'Bình tĩnh trước câu hỏi khó.'),el('p','',isPractice?'Chọn phương án phù hợp nhất, đọc lý do rồi đi tiếp. Mỗi câu chỉ được chấm một lần trong lượt.':'Trả lời thành tiếng theo cấu trúc: quyết định, nguyên nhân, bằng chứng, giới hạn. Tự đối chiếu sau khi nói.'));const measures=el('div','session-measures');for(const [n,t] of [[count,'câu ngẫu nhiên'],[isPractice?'01':'Tự luận',isPractice?'lần chấm / câu':'không chấm tự động']]){const item=el('div');item.append(el('strong','',String(n)),el('span','',t));measures.append(item);}box.append(measures,el('p','small',isPractice?'Lấy tối đa 20 câu trắc nghiệm theo bộ lọc bên trái. Khi xong, xem lại từng câu sai.':'Lấy tối đa 10 câu tự luận theo bộ lọc. Gợi ý chỉ là khung tham khảo; mức hiểu do bạn tự đánh giá.'));if(!isPractice){const label=el('label','check');const input=el('input');input.type='checkbox';input.id='timer-option';label.append(input,document.createTextNode('Bật đồng hồ 2 phút / câu (có thể tạm dừng)'));box.append(label);}const start=btn(isPractice?'Bắt đầu luyện tập →':'Bắt đầu tập bảo vệ →','primary',()=>startSession(mode));start.disabled=!count;box.append(start);if(!count)box.append(el('p','small','Không có câu phù hợp. Hãy nới bộ lọc bên trái.'));$('workspace').append(box);}
function timerSeconds(session){return Math.floor((session.elapsed+(session.running?Date.now()-session.startedAt:0))/1000);}
function stopTimer(session){if(session?.running){session.elapsed+=Date.now()-session.startedAt;session.running=false;}}
function timerBar(session){const bar=el('div','timer-bar');const output=el('output');output.id='oral-timer';output.setAttribute('aria-label','Thời gian trả lời đã dùng');function tick(){const seconds=timerSeconds(session);const mm=String(Math.floor(seconds/60)).padStart(2,'0'),ss=String(seconds%60).padStart(2,'0');output.textContent=`${mm}:${ss}`;if(seconds>=120&&!session.timerAnnounced){session.timerAnnounced=true;announce('Đã đủ hai phút. Bạn có thể tiếp tục nói hoặc xem gợi ý.');}}tick();bar.append(output,el('span','','/ 02:00 gợi ý'),btn(session.running?'Tạm dừng':'Chạy đồng hồ','secondary',()=>{if(session.running)stopTimer(session);else{session.startedAt=Date.now();session.running=true;}render();}));clockHandle=setInterval(tick,500);return bar;}
function choose(question,choice){const s=state.practice;const next=recordAnswer(s.answers,question,choice);if(next===s.answers)return;s.answers=next;saved.attempts++;if(next[question.id].correct)saved.correct++;updateProgress();render();const feedback=$('workspace').querySelector('.feedback');feedback.tabIndex=-1;feedback.focus({preventScroll:true});announce(next[question.id].correct?'Đúng. Hãy đọc phần vì sao.':'Chưa đúng. Đã mở giải thích và phương án phù hợp.');}
function renderSession(mode){const s=state[mode];if(!s){intro(mode);return;}if(s.done){renderResults(mode,s);return;}const q=questions.find(q=>q.id===s.ids[s.index]),isPractice=mode==='practice';const top=el('div','section-top');top.append(el('span','',`${isPractice?'LUYỆN TRẮC NGHIỆM':'TẬP BẢO VỆ'} · Câu ${s.index+1} / ${s.ids.length}`));if(isPractice){const score=summarize(s.answers);top.append(el('span','',`Đã trả lời ${score.answered} · Đúng ${score.correct}`));}$('workspace').append(top);const progress=el('progress','session-progress');progress.max=s.ids.length;progress.value=isPractice?summarize(s.answers).answered:s.index;progress.setAttribute('aria-label','Tiến độ lượt học');$('workspace').append(progress);const card=questionCard(q);if(isPractice){const answer=s.answers[q.id];const options=el('div','options');options.setAttribute('role','group');options.setAttribute('aria-label','Chọn một phương án');q.options.forEach((text,i)=>{const option=btn('','option',()=>choose(q,i));let marker='';if(answer){option.disabled=true;if(i===q.correct){option.classList.add('correct');marker=' ✓ Phương án đúng';}else if(i===answer.choice){option.classList.add('wrong');marker=' ✕ Bạn đã chọn';}}option.append(el('span','option-letter','ABCD'[i]),el('span','',text+marker));options.append(option);});card.append(options);if(answer){card.append(el('div',`feedback${answer.correct?'':' wrong'}`,answer.correct?'Đúng. Thử giải thích vì sao trước khi đọc tiếp.':`Chưa đúng. Phương án phù hợp là ${'ABCD'[q.correct]}.`),answerBlock(q));}else card.append(el('p','small muted','Chọn một phương án để mở phản hồi. Lựa chọn đầu tiên được tính điểm.'));}else{if(s.timerEnabled)card.append(timerBar(s));card.append(criticalPrompt(),draftField(s.drafts[q.id]||'',value=>{s.drafts[q.id]=value;}));const row=el('div','action-row');row.append(btn(s.revealed[q.id]?'Ẩn gợi ý':'Đã trình bày · đối chiếu gợi ý','primary',()=>{s.revealed[q.id]=!s.revealed[q.id];if(s.revealed[q.id])stopTimer(s);render();const target=$('workspace').querySelector('.answer')||$('workspace');target.tabIndex=-1;target.focus({preventScroll:true});}));card.append(row);if(s.revealed[q.id])card.append(answerBlock(q));}const actions=el('div','action-row');const next=btn(s.index===s.ids.length-1?'Kết thúc & xem lại':'Câu tiếp →','primary',()=>{stopTimer(s);if(s.index===s.ids.length-1)s.done=true;else{s.index++;s.elapsed=0;s.timerAnnounced=false;}render();focusWorkspace();});next.disabled=isPractice&&!s.answers[q.id];actions.append(next);card.append(actions);$('workspace').append(card);$('workspace').append(btn('Kết thúc sớm & xem lại','text-button',()=>{stopTimer(s);s.done=true;render();focusWorkspace();}));}
function renderResults(mode,s){const practice=mode==='practice',score=summarize(s.answers),list=s.ids.map(id=>questions.find(q=>q.id===id));const box=el('div','session-intro');box.append(el('span','session-kicker',practice?'KẾT QUẢ LƯỢT LUYỆN':'MỘT LƯỢT TẬP LẬP LUẬN'),el('h2','',practice?'Biết mình cần hiểu thêm ở đâu.':'Bạn đã có thêm một lần diễn đạt.'));if(practice){box.append(el('div','result-score',`${score.correct} / ${score.answered}`),el('p','',`câu đã trả lời đúng · ${s.ids.length-score.answered} câu chưa trả lời. Điểm này đo lựa chọn trong bộ ôn tập, không đo độ chính xác của hệ thống AI.`));}else{const reviewed=list.filter(q=>s.revealed[q.id]).length;box.append(el('div','result-score',`${reviewed} / ${list.length}`),el('p','', 'câu đã mở đối chiếu. Không tự chấm độ đúng của câu trả lời; hãy dùng mức hiểu để chọn phần cần ôn lại.'));}const row=el('div','action-row');row.append(btn('Chọn lượt mới','primary',()=>{state[mode]=null;render();focusWorkspace();}),btn('Về học & hiểu','secondary',()=>switchMode('study')));box.append(row);$('workspace').append(box);const review=list.filter(q=>practice?(s.answers[q.id]&&!s.answers[q.id].correct):s.revealed[q.id]);$('workspace').append(el('h2','question-title',practice?`Xem lại ${review.length} câu sai`:'Đối chiếu lại các câu đã mở'));if(!review.length)$('workspace').append(el('p','muted',practice?(score.answered?'Không có câu sai trong các câu đã trả lời. Hãy thử tự giải thích lại mà không nhìn gợi ý.':'Bạn chưa chọn phương án nào trong lượt này.'):'Chưa có câu nào được mở gợi ý trong lượt này.'));review.forEach(q=>{const detail=el('details','review-item');detail.append(el('summary','',`${q.id} · ${q.prompt}`));if(practice){detail.append(el('p','small',`Bạn chọn: ${q.options[s.answers[q.id].choice]}`),el('p','small',`Phù hợp: ${q.options[q.correct]}`));}detail.append(answerBlock(q));$('workspace').append(detail);});}
function render(){if(clockHandle){clearInterval(clockHandle);clockHandle=null;}$('workspace').replaceChildren();const active=state.mode!=='study'&&Boolean(state[state.mode]);for(const id of ['search','topic','difficulty','learning','bookmarks-only','clear-filters'])$(id).disabled=active;$('filter-note').textContent=active?'Bộ lọc được giữ cố định cho lượt này. Chọn lượt mới ở trang kết quả để đổi bộ lọc.':'Bộ lọc áp dụng cho cả ba chế độ.';$('filtered-count').textContent=`${pool().length} câu phù hợp`;for(const button of document.querySelectorAll('[data-mode]')){if(button.dataset.mode===state.mode)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');}if(state.mode==='study')renderStudy();else renderSession(state.mode);}
function switchMode(mode){if(state.mode==='defense')stopTimer(state.defense);state.mode=mode;render();announce(`Chế độ ${mode==='study'?'học và hiểu':mode==='practice'?'luyện trắc nghiệm':'tập bảo vệ'}.`);}
function clearFilters(){state.filter={search:'',topic:'all',difficulty:'all',learning:'all',bookmarks:false};$('search').value='';for(const id of ['topic','difficulty','learning'])$(id).value='all';$('bookmarks-only').checked=false;state.index=0;state.revealed=false;state.draft='';render();}
for(const [key,label] of Object.entries(TOPICS)){const option=el('option','',label);option.value=key;$('topic').append(option);}
for(const id of ['search','topic','difficulty','learning','bookmarks-only'])$(id).addEventListener(id==='search'?'input':'change',()=>{state.filter[id==='bookmarks-only'?'bookmarks':id]=id==='bookmarks-only'?$(id).checked:$(id).value;state.index=0;state.revealed=false;state.draft='';render();});
for(const button of document.querySelectorAll('[data-mode]'))button.addEventListener('click',()=>switchMode(button.dataset.mode));
$('clear-filters').addEventListener('click',clearFilters);
$('save-local').checked=persist;$('save-local').addEventListener('change',()=>{persist=$('save-local').checked;if(persist){storageOK=true;save();}else{try{localStorage.removeItem(STORAGE_KEY);}catch(_){storageOK=false;}}storageNotice();announce(persist?'Đã bật lưu tiến độ cục bộ.':'Đã tắt lưu cục bộ. Tiến độ vẫn còn trong phiên hiện tại.');});
$('reset-progress').addEventListener('click',()=>{if(!window.confirm('Xóa toàn bộ mức hiểu và tổng điểm luyện tập đã lưu? Dấu trang và câu hỏi đang mở được giữ nguyên. Lượt luyện hiện tại vẫn giữ lựa chọn để không chấm lặp.'))return;saved.ratings={};saved.attempts=0;saved.correct=0;updateProgress();render();announce('Đã đặt lại mức hiểu và tổng điểm. Dấu trang và câu hỏi được giữ nguyên.');});
$('question-count').textContent=questions.length;$('mcq-count').textContent=questions.filter(q=>q.type==='mcq').length;$('oral-count').textContent=questions.filter(q=>q.type==='oral').length;storageNotice();updateProgress();render();
})();
