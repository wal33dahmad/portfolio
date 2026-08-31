-- Featured-tier layout adjustment.
--
-- JOK in the Box rejoins the full-width hero cards: its three phone shots only
-- compose as a fan in the `wide` variant, so a bento slot would drop two of
-- them. That leaves two bento cards, and WeyDocs takes the narrow full-height
-- sidebar it had before — which requires it to precede the SaaS dashboard.
--
-- Resulting render:
--   hero   PublishAI  |  Fleet Platform  |  JOK in the Box
--   bento  WeyDocs (2 cols x 2 rows)  +  Mirnint SaaS Dashboard (4 cols x 2 rows)

begin;

update projects p set "order" = v.ord
from (values
  ('weydocs', 3), ('mirnint-saas-dashboard', 4)
) as v(id, ord)
where p.id = v.id;

commit;
