---
templateKey: blog-post
thumbnail: 
date: 2023-06-18
title: 5초 주기로 반복하는 애니메이션을 사용하면 안되는 걸까?
description: "2016년에 생각을 정리했던 메모"
---
애플의 [Human Interface Guidelines](human-interface-guidelines/motion)을 보다가 재밌는 부분을 보게 되었습니다.

>지속적으로 진동하는 물체를 표시하지 마십시오. 특히 0.2Hz 부근의 주파수는 사람들이 매우 민감할 수 있으므로 진동을 표시하지 않는 것이 좋습니다. 진동하는 개체를 표시해야 하는 경우 진폭을 낮게 유지하고 콘텐츠를 반투명하게 만드는 것을 고려하십시오.
>
>Avoid showing objects that oscillate in a sustained way. In particular, you want to avoid showing an oscillation that has a frequency of around 0.2Hz because people can be very sensitive to this frequency. If you need to show objects oscillating, aim to keep the amplitude low and consider making the content translucent.

1 Hz는 “1초에 한 번”을 의미합니다. 0.2Hz는 1초에 0.2번, 5초에 1번 주기의 진동하는 것이지요. 우선 이런 주기로 애니메이션을 만드는 일은 거의 없습니다. 그리고 이런 움직임을 사람이 민감하게 느낀다는 것이 이상하지 않나요? 좀 더 빠른 움직임이 더 신경쓰이고, 느린 움직임은 안정감을 주는게 맞지 않을까 하는 생각이 드는 겁니다. 

애플 제품 중 이런 느린 주기를 쓰고 칭찬받는 것도 있어요. 슬립모드의 맥북은 LED 상태등을 숨쉬는 듯한 느낌을 주도록 점멸하는데 이것으로 특허(Breathing status LED indicator)도 가지고 있습니다. 근데 특허 내용을 보면 상태등이 '숨쉬는'주가는 1400ms로 0.7Hz 입니다. 좋아요 이건 0.2Hz '부근'의 주파수라고 하기는 어렵네요. 무죄입니다.

그래도 의심은 남습니다. 더 빠른 주기가 더 민감하지 않을까? 성격 급한 사람들이 답답함을 느끼는 것일까? Perplexity로 검색해봐도 이 디자인가이드의 레퍼런스는 찾을 수 없다고 합니다. 대체 어디서 나온 걸까요? 

## visionOS 그리고 멀미
>이사벨라는 주도적으로 행동해야만 멀미를 하지 않을 수 있었습니다.
Isabella could control her motion sickness only by controlling her motions.
>
>— 맛을 보여드립니다 (Woman On Top), 2000

힌트는 이 내용이 나오는 문단의 제목에 있었습니다. 스크롤을 너무 빠르게 내렸었네요. 앞에서 0.2Hz를 언급한 내용은 Platform considerations/visionOS 에서 나옵니다. 

마침 학술검색에서 0.2Hz 관련된 연구도 찾았습니다.

>[A motion sickness maximum around the 0.2 Hz frequency range of horizontal translational oscillation](https://pubmed.ncbi.nlm.nih.gov/11277284/)
>
>이 연구에는 메스꺼움이 약 0.2Hz에서 최대로 유발될 것이라는 가설을 세우고 검증합니다. 12명의 피험자를 수평운동(horizontal sinusoidal motion)에 노출시킵니다. 1주를 간격으로 3개의 다른 주파수(0.1, 0.2 및 0.4Hz)로 실험한 결과 0.2Hz 주파수에서 가장 많은 피험자가 가장 빠르게 심한 메스꺼움을 느낀다는 것을 입증했습니다.
>
>Golding JF, Mueller AG, Gresty MA. A motion sickness maximum around the 0.2 Hz frequency range of horizontal translational oscillation. Aviat Space Environ Med. 2001 Mar;72(3):188-92. PMID: 11277284.

좀 뜬금없게도 멀미와 관련된 내용이에요. 항공, 우주 및 환경 의학(ASEM)저널에 게시되었고 구글 학술검색 기준으로 140회 인용된 아티클입니다. 가이드라인에서 인용을 명시하고 있지는 않지만 아마도 이 연구로부터 나온 숫자일 가능성이 높습니다. 과거부터 VR 헤드셋이 가진 주요 과제가 어지러움증을 해결하는 것이었다는 사실도 가능성을 더합니다.

## 결론
언젠가는 iOS용 앱이나 웹에서 5초에 한번씩 왕복하는 꿀벌 애니메이션을 쓰고 싶을 수도 있습니다. 0.2Hz 부근의 주파수를 가지는 움직임이므로 피해야 할까요? 아닙니다. 하지만 VR 기기에서 디자인하는 경우에는 가능한 눈의 띄지 않게(진폭을 낮게 유지하고 콘텐츠를 반투명하게)해야 합니다.