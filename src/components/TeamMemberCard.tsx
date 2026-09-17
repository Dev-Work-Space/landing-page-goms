import { ArrowUpRight, Code2 } from 'lucide-react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import type { TeamMember } from '../data/team'

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="border-0 bg-transparent p-0 shadow-none">
      <CardContent className="about-grid p-0">
        <div className={`founder-art founder-art-${member.id}`}>
          <div className="founder-grid" aria-hidden="true" />
          <div className="founder-orbit" aria-hidden="true" />
          <span className="founder-label">A PESSOA POR TRÁS DO CÓDIGO</span>
          <Avatar className="founder-avatar" role="img" aria-label={`Avatar de ${member.name}`}>
            <AvatarFallback className="founder-monogram">
              {member.initial}
              <span>.</span>
            </AvatarFallback>
          </Avatar>
          <div className="founder-signature">
            <div>
              {member.name}
              <span>{member.role}</span>
            </div>
            <Code2 size={24} strokeWidth={1.3} aria-hidden="true" />
          </div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">{member.role.toUpperCase()}</p>
          <h3 className="founder-name">Prazer, {member.name}.</h3>
          <p className="founder-intro">{member.intro}</p>
          <p>{member.bio}</p>
          <p>{member.approach}</p>
          <div className="about-values">
            {member.values.map((value) => (
              <span key={value}>
                <i />
                {value}
              </span>
            ))}
          </div>
          <Button asChild variant="link" className="h-auto justify-start p-0 text-xs text-accent">
            <a href="#contato">
              Vamos tirar sua ideia do papel <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
